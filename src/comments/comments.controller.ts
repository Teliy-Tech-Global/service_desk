import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('api/tickets/:ticketId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Param('ticketId') ticketId: string, @Body() dto: CreateCommentDto) {
    return this.commentsService.create({ ...dto, ticketId: +ticketId });
  }

  @Get()
  findAll(@Param('ticketId') ticketId: string) {
    return this.commentsService.findAllByTicket(+ticketId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
// This controller defines the RESTful API endpoints for managing comments on tickets.
// It includes methods for creating, retrieving, updating, and deleting comments, using the CommentsService to handle the business logic.
