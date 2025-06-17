import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepo: Repository<Attachment>,
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async create(dto: CreateAttachmentDto): Promise<Attachment> {
    const ticket = await this.ticketRepo.findOneBy({ id: dto.ticketId });
    if (!ticket) {
      throw new Error(`Ticket with ID ${dto.ticketId} not found`);
    }

    const attachment = this.attachmentRepo.create({
      filename: dto.filename,
      path: dto.path,
      ticket: ticket, // safe because ticket is not null
    });

    return this.attachmentRepo.save(attachment);
  }

  async update(id: number, dto: UpdateAttachmentDto): Promise<Attachment> {
    const existing = await this.attachmentRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`Attachment with ID ${id} not found`);
    }

    const updated = Object.assign(existing, dto);
    return this.attachmentRepo.save(updated);
  }

  remove(id: number): Promise<void> {
    return this.attachmentRepo.delete(id).then(() => undefined);
  }

  findByTicket(ticketId: number): Promise<Attachment[]> {
    return this.attachmentRepo.find({ where: { ticket: { id: ticketId } } });
  }
}
