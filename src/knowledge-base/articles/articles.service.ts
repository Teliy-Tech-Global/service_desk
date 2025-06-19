import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Category } from '../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepo.find();
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException(`Article ${id} not found`);
    return article;
  }

  async create(dto: CreateArticleDto): Promise<Article> {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    const author = await this.userRepo.findOneBy({ id: dto.authorId });

    if (!category || !author)
      throw new NotFoundException('Category or Author not found');

    const article = this.articleRepo.create({
      title: dto.title,
      content: dto.content,
      category,
      author,
    });

    return this.articleRepo.save(article);
  }

  async update(id: number, dto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: dto.categoryId,
      });
      if (!category) throw new NotFoundException('Category not found');
      article.category = category;
    }

    Object.assign(article, dto);
    return this.articleRepo.save(article);
  }

  async delete(id: number): Promise<void> {
    await this.articleRepo.delete(id);
  }
}
