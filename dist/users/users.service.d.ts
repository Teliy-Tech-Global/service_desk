import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/roles/roles.enum';
export declare class UsersService {
    private usersRepo;
    constructor(usersRepo: Repository<User>);
    create(data: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, dto: UpdateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findOrCreateFromOAuth(profile: any): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    updateRole(id: number, role: Role): Promise<import("typeorm").UpdateResult>;
}
