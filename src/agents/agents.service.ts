import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private agentRepo: Repository<Agent>,
  ) {}

  async create(dto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentRepo.create(dto);
    return await this.agentRepo.save(agent);
  }

  findAll(): Promise<Agent[]> {
    return this.agentRepo.find();
  }

  async findOne(id: number): Promise<Agent> {
    const agent = await this.agentRepo.findOne({ where: { id } });
    if (!agent) throw new NotFoundException('Agent not found');
    return agent;
  }

  async update(id: number, dto: UpdateAgentDto): Promise<Agent> {
    const agent = await this.findOne(id);
    Object.assign(agent, dto);
    return this.agentRepo.save(agent);
  }

  async remove(id: number): Promise<void> {
    const result = await this.agentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Agent not found');
  }

  async findTicketsByAgent(agentId: number) {
    // Implement ticket-lookup logic later when ticket module is ready
    return []; // Stub
  }
}
