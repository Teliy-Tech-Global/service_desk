import { Repository } from 'typeorm';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
export declare class AgentsService {
    private agentRepo;
    constructor(agentRepo: Repository<Agent>);
    create(dto: CreateAgentDto): Promise<Agent>;
    findAll(): Promise<Agent[]>;
    findOne(id: number): Promise<Agent>;
    update(id: number, dto: UpdateAgentDto): Promise<Agent>;
    remove(id: number): Promise<void>;
    findTicketsByAgent(agentId: number): Promise<never[]>;
}
