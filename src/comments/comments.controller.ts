import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('api/tickets/:ticketId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment for a ticket' })
  @ApiParam({
    name: 'ticketId',
    type: 'string',
    description: 'ID of the ticket',
  })
  create(@Param('ticketId') ticketId: string, @Body() dto: CreateCommentDto) {
    return this.commentsService.create({ ...dto, ticketId: +ticketId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for a specific ticket' })
  @ApiParam({
    name: 'ticketId',
    type: 'string',
    description: 'ID of the ticket',
  })
  findAll(@Param('ticketId') ticketId: string) {
    return this.commentsService.findAllByTicket(+ticketId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single comment by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the comment' })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the comment' })
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the comment' })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
