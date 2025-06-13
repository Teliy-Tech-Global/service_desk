import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const ticket = await this.ticketRepo.findOneBy({
      id: createCommentDto.ticketId,
    });
    const user = await this.userRepo.findOneBy({
      id: createCommentDto.authorId,
    });

    if (!ticket || !user)
      throw new NotFoundException('Ticket or Author not found');

    const comment = this.commentRepo.create({
      content: createCommentDto.content,
      ticket,
      author: user,
    });

    return this.commentRepo.save(comment);
  }

  findAllByTicket(ticketId: number) {
    return this.commentRepo.find({
      where: { ticket: { id: ticketId } },
      relations: ['author'],
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.commentRepo.findOne({
      where: { id },
      relations: ['ticket', 'author'],
    });
  }

  async update(id: number, updateDto: UpdateCommentDto) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) throw new NotFoundException('Comment not found');

    Object.assign(comment, updateDto);
    return this.commentRepo.save(comment);
  }

  async remove(id: number) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.commentRepo.remove(comment);
  }
}
// This service manages comments on tickets.
// It allows creating, retrieving, updating, and deleting comments.
