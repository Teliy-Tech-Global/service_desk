import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Ticket, User])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
// This module defines the CommentsModule, which is responsible for managing comments on tickets.
// It imports the TypeOrmModule to work with the Comment, Ticket, and User entities, and provides the CommentsService and CommentsController.
