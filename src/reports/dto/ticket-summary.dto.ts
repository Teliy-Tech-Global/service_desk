// src/reports/dto/ticket-summary.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class TicketSummaryDto {
  @ApiProperty({ example: 10, description: 'Total number of open tickets' })
  open: number;

  @ApiProperty({
    example: 5,
    description: 'Total number of tickets in progress',
  })
  inProgress: number;

  @ApiProperty({ example: 7, description: 'Total number of resolved tickets' })
  resolved: number;

  @ApiProperty({ example: 3, description: 'Total number of closed tickets' })
  closed: number;
}
