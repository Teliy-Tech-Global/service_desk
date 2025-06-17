import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Controller('api/tickets/:ticketId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  create(
    @Param('ticketId') ticketId: number,
    @Body() dto: CreateAttachmentDto,
  ) {
    return this.attachmentsService.create({ ...dto, ticketId });
  }

  @Get()
  findAll(@Param('ticketId') ticketId: number) {
    return this.attachmentsService.findByTicket(ticketId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attachmentsService.findByTicket(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAttachmentDto) {
    return this.attachmentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.attachmentsService.remove(id);
  }
}
// This controller defines the RESTful API endpoints for managing attachments on tickets.
// It includes methods for creating, retrieving, updating, and deleting attachments, using the AttachmentsService to handle the business logic.
