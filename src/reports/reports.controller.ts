import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AgentPerformanceDto } from './dto/agent-performance.dto';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AgentPerformance } from './interfaces/agent-performance.interface';
import { TicketSummary } from './interfaces/ticket-summary.interface';

@ApiTags('Reports') // Tag for grouping endpoints in Swagger UI
@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('tickets/summary')
  @ApiOperation({ summary: 'Get summary of all tickets' })
  @ApiOkResponse({
    description: 'Returns overall ticket statistics.',
    type: [TicketSummary], // You may define this as a class if you want it to show up nicely
  })
  getTicketSummary() {
    return this.reportsService.getTicketSummary();
  }

  @Get('agents/performance')
  @ApiOperation({ summary: 'Get performance report for all agents' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Start date for performance filter (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'End date for performance filter (YYYY-MM-DD)',
  })
  @ApiOkResponse({
    description: 'Returns performance metrics for agents.',
    type: [AgentPerformanceDto], // Use DTO class for better Swagger docs
  })
  getAgentPerformance(@Query() filter: AgentPerformanceDto) {
    return this.reportsService.getAgentPerformance(filter);
  }
}
