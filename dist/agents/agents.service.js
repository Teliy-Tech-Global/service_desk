"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agent_entity_1 = require("./entities/agent.entity");
let AgentsService = class AgentsService {
    agentRepo;
    constructor(agentRepo) {
        this.agentRepo = agentRepo;
    }
    async create(dto) {
        const agent = this.agentRepo.create(dto);
        return await this.agentRepo.save(agent);
    }
    findAll() {
        return this.agentRepo.find();
    }
    async findOne(id) {
        const agent = await this.agentRepo.findOne({ where: { id } });
        if (!agent)
            throw new common_1.NotFoundException('Agent not found');
        return agent;
    }
    async update(id, dto) {
        const agent = await this.findOne(id);
        Object.assign(agent, dto);
        return this.agentRepo.save(agent);
    }
    async remove(id) {
        const result = await this.agentRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Agent not found');
    }
    async findTicketsByAgent(agentId) {
        return [];
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agent_entity_1.Agent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AgentsService);
//# sourceMappingURL=agents.service.js.map