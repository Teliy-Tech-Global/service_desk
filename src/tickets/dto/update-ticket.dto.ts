import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
// This DTO is used to update an existing ticket in the system.
// It extends the CreateTicketDto, allowing any field to be optional for updates.
