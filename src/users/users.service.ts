import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/roles/roles.enum';
import { Inject, forwardRef } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(data: CreateUserDto) {
    const userData: Partial<User> = { ...data };

    if (data.password) {
      userData.password = await bcrypt.hash(data.password, 10);
    }

    if (!userData.role) {
      userData.role = Role.User;
    }

    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }

  findById(id: number) {
    return this.usersRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findOrCreateFromOAuth(profile: any) {
    const email = profile.email || profile._json?.email;
    if (!email) {
      throw new Error('OAuth profile does not contain an email');
    }

    let user = await this.findByEmail(email);

    if (!user) {
      user = this.usersRepo.create({
        email,
        password: '',
        role: Role.User,
      });
      await this.usersRepo.save(user);
    }

    return user;
  }

  remove(id: number) {
    return this.usersRepo.delete(id);
  }

  updateRole(id: number, role: Role) {
    return this.usersRepo.update(id, { role });
  }
}
