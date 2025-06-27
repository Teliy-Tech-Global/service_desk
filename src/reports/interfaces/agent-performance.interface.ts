export interface AgentPerformance {
  agentId: number;
  fullName: string;
  ticketCount: number;
  resolvedTickets: number;
  resolutionRate: number; // percentage
}
export interface AgentPerformanceFilter {
  from?: string; // ISO date string
  to?: string; // ISO date string
}
