import { TicketService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    create(dto: CreateTicketDto): Promise<import("./entities/ticket.entity").Ticket>;
    findAll(): Promise<import("./entities/ticket.entity").Ticket[]>;
    findOne(id: string): Promise<import("./entities/ticket.entity").Ticket>;
    update(id: string, dto: UpdateTicketDto): Promise<import("./entities/ticket.entity").Ticket>;
    remove(id: string): Promise<void>;
}
