import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@ApiTags('Agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  create(@Body() dto: CreateAgentDto) {
    return this.agentsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all agents' })
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single agent by ID' })
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an agent by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateAgentDto) {
    return this.agentsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an agent by ID' })
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }

  @Get(':id/tickets')
  @ApiOperation({ summary: 'Get tickets assigned to an agent' })
  getTickets(@Param('id') id: string) {
    return this.agentsService.findTicketsByAgent(+id);
  }
}
