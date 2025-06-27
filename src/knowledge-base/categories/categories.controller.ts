import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories') // Grouped under "Categories" in Swagger
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
