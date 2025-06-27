import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket, TicketStatus } from '../tickets/entities/ticket.entity';
import { Repository } from 'typeorm';
import { Agent } from '../agents/entities/agent.entity';
import { AgentPerformanceDto } from './dto/agent-performance.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,

    @InjectRepository(Agent)
    private readonly agentRepo: Repository<Agent>,
  ) {}

  async getTicketSummary() {
    const total = await this.ticketRepo.count();
    const open = await this.ticketRepo.count({
      where: { status: TicketStatus.OPEN },
    });
    const inProgress = await this.ticketRepo.count({
      where: { status: TicketStatus.IN_PROGRESS },
    });
    const resolved = await this.ticketRepo.count({
      where: { status: TicketStatus.RESOLVED },
    });
    const closed = await this.ticketRepo.count({
      where: { status: TicketStatus.CLOSED },
    });

    return {
      total,
      open,
      inProgress,
      resolved,
      closed,
    };
  }

  async getAgentPerformance(filter: AgentPerformanceDto) {
    const agents = await this.agentRepo.find({ relations: ['tickets'] });

    return agents.map((agent) => {
      const ticketCount = agent.tickets?.length || 0;
      const resolvedTickets =
        agent.tickets?.filter((t) => t.status === 'Resolved').length || 0;

      return {
        agentId: agent.id,
        fullName: agent.fullName,
        ticketCount,
        resolvedTickets,
        resolutionRate: ticketCount ? (resolvedTickets / ticketCount) * 100 : 0,
      };
    });
  }
}
