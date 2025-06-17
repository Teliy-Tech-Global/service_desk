import { IsNotEmpty } from 'class-validator';

export class CreateAttachmentDto {
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  ticketId: number;
}
// This DTO is used to create a new attachment for a ticket.
// It includes fields for the filename, the path where the attachment is stored, and the ID of the ticket to which the attachment belongs.
