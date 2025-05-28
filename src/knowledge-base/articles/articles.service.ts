import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/users/entities/user.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateArticleDto, author: User): Promise<Article> {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const article = this.articleRepository.create({
      ...dto,
      author,
      category,
    });

    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['author', 'category'],
    });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async update(
    id: number,
    dto: UpdateArticleDto,
    user: User,
  ): Promise<Article> {
    const article = await this.findOne(id);

    if (article.author.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException(
        'You are not allowed to update this article',
      );
    }

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) throw new NotFoundException('Category not found');
      article.category = category;
    }

    Object.assign(article, dto);
    return this.articleRepository.save(article);
  }

  async remove(id: number, user: User): Promise<void> {
    const article = await this.findOne(id);

    if (article.author.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException(
        'You are not allowed to delete this article',
      );
    }

    await this.articleRepository.remove(article);
  }
}
