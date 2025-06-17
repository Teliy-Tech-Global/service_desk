import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment, Ticket])],
  providers: [AttachmentsService],
  controllers: [AttachmentsController],
})
export class AttachmentsModule {}
// This module defines the AttachmentsModule, which is responsible for managing attachments related to tickets.
// It imports the TypeOrmModule to work with the Attachment and Ticket entities, and provides the AttachmentsService and AttachmentsController.
