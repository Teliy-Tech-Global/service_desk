import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttachmentDto {
  @ApiProperty({
    example: 'error-screenshot.png',
    description: 'Name of the attachment file',
  })
  @IsNotEmpty()
  filename: string;

  @ApiProperty({
    example: '/uploads/tickets/123/error-screenshot.png',
    description: 'Storage path of the attachment file',
  })
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    example: 123,
    description: 'ID of the ticket the attachment is linked to',
  })
  @IsNotEmpty()
  ticketId: number;
}

// This DTO is used to create a new attachment for a ticket.
// It includes fields for the filename, the path where the attachment is stored, and the ID of the ticket to which the attachment belongs.
