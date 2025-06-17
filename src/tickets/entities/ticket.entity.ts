import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketPriority } from '../enums/ticket-priority.enum';
// import { Agent } from 'http';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tickets, { eager: true })
  reporter: User;

  @ManyToOne(() => User, (user) => user.assignedTickets, {
    nullable: true,
    eager: true,
  })
  assigned_to: User;

  @Column({ nullable: true })
  category: string;

  @Column('text', { nullable: true })
  tags: string;

  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments: Comment[];

  @OneToMany(() => Attachment, (attachment) => attachment.ticket, {})
  attachments: Attachment[];
  user: any;
}
// This Ticket entity represents a support ticket in the system.
// It includes fields for the ticket's title, description, status, priority, creation and update timestamps,
