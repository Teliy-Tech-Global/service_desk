import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './tickets.service';

describe('TicketsService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
// This test suite checks if the TicketsService is defined after being instantiated by the NestJS testing module.
// It uses Jest as the testing framework, which is the default for NestJS applications.
