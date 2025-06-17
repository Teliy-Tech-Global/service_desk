import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.comments, { onDelete: 'CASCADE' })
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  author: User;

  // One user can write multiple comments
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  user: any;
}
// This entity defines the Comment model, which represents comments made on tickets.
// It includes fields for the comment content, the associated ticket, the author of the comment, and timestamps for creation and updates.
