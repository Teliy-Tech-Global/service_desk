import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This issue needs to be fixed ASAP',
    description: 'Content of the comment',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 1, description: 'ID of the related ticket' })
  @IsInt()
  ticketId: number;

  @ApiProperty({
    example: 42,
    description: 'ID of the user making the comment',
  })
  @IsInt()
  authorId: number;
}

// This DTO is used to create a new comment on a ticket.
// It includes fields for the comment content, the ID of the ticket it belongs to, and the ID of the author making the comment.
