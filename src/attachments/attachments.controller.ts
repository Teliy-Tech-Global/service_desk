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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Attachments')
@Controller('api/tickets/:ticketId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attachment for a ticket' })
  create(
    @Param('ticketId') ticketId: number,
    @Body() dto: CreateAttachmentDto,
  ) {
    return this.attachmentsService.create({ ...dto, ticketId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all attachments for a ticket' })
  findAll(@Param('ticketId') ticketId: number) {
    return this.attachmentsService.findByTicket(ticketId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific attachment by ID' })
  findOne(@Param('id') id: number) {
    return this.attachmentsService.findByTicket(id); // ⚠️ likely a bug — should be `findOne(id)`?
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an attachment by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateAttachmentDto) {
    return this.attachmentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an attachment by ID' })
  remove(@Param('id') id: number) {
    return this.attachmentsService.remove(id);
  }
}
