import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../../auth/roles/roles.enum';
import { Article } from 'src/knowledge-base/articles/article.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Agent } from 'src/agents/entities/agent.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  // One user can create multiple tickets (support requests)
  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  // One user can write multiple comments
  // @OneToMany(() => Comment, (comment) => comment.user)
  // comments: Comment[];

  // One user can be associated with one agent profile (if this user is also an agent)
  @OneToMany(() => Agent, (agent) => agent.user)
  agentProfile: Agent[];
  comments: any;
  assignedTickets: any;
}
