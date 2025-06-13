import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    validateOAuthLogin(profile: any): Promise<User>;
}
