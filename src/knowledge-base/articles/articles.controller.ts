import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Articles') // Groups endpoints under "Articles"
@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single article by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  create(@Body() dto: CreateArticleDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an article by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an article by ID' })
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
