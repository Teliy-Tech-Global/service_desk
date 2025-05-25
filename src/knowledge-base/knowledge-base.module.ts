// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ArticlesController } from './articles/articles.controller';
// import { ArticlesService } from './articles/articles.service';
// import { Article } from './articles/article.entity';
// import { Category } from './categories/category.entity';
// import { CategoriesService } from './categories/categories.service';
// import { CategoriesController } from './categories/categories.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Article, Category])],
//   controllers: [ArticlesController, CategoriesController],
//   providers: [ArticlesService, CategoriesService],
// })
// export class KnowledgeBaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { Article } from './articles/article.entity';
import { Category } from './categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category])],
  controllers: [ArticlesController, CategoriesController],
  providers: [ArticlesService, CategoriesService],
})
export class KnowledgeBaseModule {}
