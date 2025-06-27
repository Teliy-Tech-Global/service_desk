import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TicketsModule } from '../tickets/tickets.module';
import { AgentsModule } from '../agents/agents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Agent } from '../agents/entities/agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Agent])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
