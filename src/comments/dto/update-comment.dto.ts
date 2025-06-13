import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
// This DTO is used to update an existing comment on a ticket.
// It extends the CreateCommentDto, allowing any field to be optional for updates.
