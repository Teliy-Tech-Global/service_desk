import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachmentDto } from './create-attachment.dto';

export class UpdateAttachmentDto extends PartialType(CreateAttachmentDto) {}
// This DTO is used to update an existing attachment.
// It extends the CreateAttachmentDto, allowing any field to be optional for updates.
