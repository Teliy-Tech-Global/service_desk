import { IsOptional, IsDateString } from 'class-validator';

export class AgentPerformanceDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}
