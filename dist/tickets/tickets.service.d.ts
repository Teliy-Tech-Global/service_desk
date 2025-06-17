import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketService {
    private ticketRepo;
    constructor(ticketRepo: Repository<Ticket>);
    create(createDto: CreateTicketDto): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
    findOne(id: number): Promise<Ticket>;
    update(id: number, updateDto: UpdateTicketDto): Promise<Ticket>;
    remove(id: number): Promise<void>;
}
