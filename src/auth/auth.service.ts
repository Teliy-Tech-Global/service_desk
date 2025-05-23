// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from './roles/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async validateOAuthLogin(profile: any): Promise<User> {
    const email =
      profile?.email || profile?.emails?.[0]?.value || profile?._json?.email;

    if (!email) {
      throw new Error('OAuth profile does not contain a valid email');
    }

    let user = await this.usersRepo.findOneBy({ email });

    if (!user) {
      user = this.usersRepo.create({
        email,
        role: Role.User, // Default role for OAuth users
        password: '', // OAuth users typically don’t need a password
      });

      await this.usersRepo.save(user);
    }

    return user;
  }
}
