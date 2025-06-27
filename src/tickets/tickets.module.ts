import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './tickets.service';
import { TicketController } from './tickets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketsModule {}
// This module defines the TicketModule, which is responsible for managing tickets in the system.
// It imports the TypeOrmModule to work with the Ticket entity, and provides the TicketService and TicketController.
