import { Ticket } from '../../tickets/entities/ticket.entity';
export declare class Agent {
    id: number;
    userId: number;
    department: string;
    created_at: Date;
    updated_at: Date;
    tickets: Ticket[];
    user: any;
}
