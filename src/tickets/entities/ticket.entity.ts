import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Agent } from 'src/agents/entities/agent.entity';
import { Comment } from 'src/comments/entities/comment.entity';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  // The user who created the ticket
  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  // The agent assigned to the ticket
  @ManyToOne(() => Agent, (agent) => agent.tickets, { nullable: true })
  agent: Agent;

  // Ticket can have many comments
  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
