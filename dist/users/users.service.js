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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const roles_enum_1 = require("../auth/roles/roles.enum");
let UsersService = class UsersService {
    usersRepo;
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    async create(data) {
        const userData = { ...data };
        if (data.password) {
            userData.password = await bcrypt.hash(data.password, 10);
        }
        if (!userData.role) {
            userData.role = roles_enum_1.Role.User;
        }
        const user = this.usersRepo.create(userData);
        return this.usersRepo.save(user);
    }
    findAll() {
        return this.usersRepo.find();
    }
    findById(id) {
        return this.usersRepo.findOneBy({ id });
    }
    async update(id, dto) {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        return this.usersRepo.save(user);
    }
    async findByEmail(email) {
        return this.usersRepo.findOne({ where: { email } });
    }
    async findOrCreateFromOAuth(profile) {
        const email = profile.email || profile._json?.email;
        if (!email) {
            throw new Error('OAuth profile does not contain an email');
        }
        let user = await this.findByEmail(email);
        if (!user) {
            user = this.usersRepo.create({
                email,
                password: '',
                role: roles_enum_1.Role.User,
            });
            await this.usersRepo.save(user);
        }
        return user;
    }
    remove(id) {
        return this.usersRepo.delete(id);
    }
    updateRole(id, role) {
        return this.usersRepo.update(id, { role });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map