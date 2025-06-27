import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: 'How to Resolve Login Issues',
    description: 'Title of the article',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This article explains steps to resolve login issues...',
    description: 'Content/body of the article',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 2,
    description: 'ID of the knowledge base category the article belongs to',
  })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: 5,
    description: 'ID of the user creating the article',
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
