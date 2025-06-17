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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const ticket_entity_1 = require("../tickets/entities/ticket.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CommentsService = class CommentsService {
    commentRepo;
    ticketRepo;
    userRepo;
    constructor(commentRepo, ticketRepo, userRepo) {
        this.commentRepo = commentRepo;
        this.ticketRepo = ticketRepo;
        this.userRepo = userRepo;
    }
    async create(createCommentDto) {
        const ticket = await this.ticketRepo.findOneBy({
            id: createCommentDto.ticketId,
        });
        const user = await this.userRepo.findOneBy({
            id: createCommentDto.authorId,
        });
        if (!ticket || !user)
            throw new common_1.NotFoundException('Ticket or Author not found');
        const comment = this.commentRepo.create({
            content: createCommentDto.content,
            ticket,
            author: user,
        });
        return this.commentRepo.save(comment);
    }
    findAllByTicket(ticketId) {
        return this.commentRepo.find({
            where: { ticket: { id: ticketId } },
            relations: ['author'],
            order: { created_at: 'DESC' },
        });
    }
    findOne(id) {
        return this.commentRepo.findOne({
            where: { id },
            relations: ['ticket', 'author'],
        });
    }
    async update(id, updateDto) {
        const comment = await this.commentRepo.findOneBy({ id });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        Object.assign(comment, updateDto);
        return this.commentRepo.save(comment);
    }
    async remove(id) {
        const comment = await this.commentRepo.findOneBy({ id });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        return this.commentRepo.remove(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map