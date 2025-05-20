import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
export declare class AgentsController {
    private readonly agentsService;
    constructor(agentsService: AgentsService);
    create(dto: CreateAgentDto): Promise<import("./entities/agent.entity").Agent>;
    findAll(): Promise<import("./entities/agent.entity").Agent[]>;
    findOne(id: string): Promise<import("./entities/agent.entity").Agent>;
    update(id: string, dto: UpdateAgentDto): Promise<import("./entities/agent.entity").Agent>;
    remove(id: string): Promise<void>;
    getTickets(id: string): Promise<never[]>;
}
