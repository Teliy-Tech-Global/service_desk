import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles/entities/article.entity';
import { Category } from './categories/entities/category.entity';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Category]),
    UsersModule, // ✅ Include User here
  ],
  controllers: [ArticlesController, CategoriesController],
  providers: [ArticlesService, CategoriesService],
  exports: [ArticlesService, CategoriesService],
})
export class KnowledgeBaseModule {}
