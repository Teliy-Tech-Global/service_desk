import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsInt()
  ticketId: number;

  @IsInt()
  authorId: number;
}
// This DTO is used to create a new comment on a ticket.
// It includes fields for the comment content, the ID of the ticket it belongs to, and the ID of the author making the comment.
