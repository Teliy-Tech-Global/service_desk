import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AgentPerformanceDto } from './dto/agent-performance.dto';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('tickets/summary')
  getTicketSummary() {
    return this.reportsService.getTicketSummary();
  }

  @Get('agents/performance')
  getAgentPerformance(@Query() filter: AgentPerformanceDto) {
    return this.reportsService.getAgentPerformance(filter);
  }
}
