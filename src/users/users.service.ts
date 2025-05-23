// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { User } from './user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { Role } from '../auth/roles/roles.enum'; // ✅ Import Role enum for type safety

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepo: Repository<User>,
//   ) {}

//   async create(data: CreateUserDto) {
//     const userData: Partial<User> = { ...data };

//     if (data.password) {
//       userData.password = await bcrypt.hash(data.password, 10);
//     }

//     // Ensure role is a valid enum
//     if (!userData.role) {
//       userData.role = Role.User;
//     }

//     const user = this.usersRepo.create(userData);
//     return this.usersRepo.save(user);
//   }

//   findAll() {
//     return this.usersRepo.find();
//   }

//   findById(id: number) {
//     return this.usersRepo.findOneBy({ id });
//   }

//   async findByEmail(email: string) {
//     return this.usersRepo.findOne({ where: { email } });
//   }

//   async findOrCreateFromOAuth(profile: any) {
//     const email = profile.email || profile._json?.email;
//     if (!email) {
//       throw new Error('OAuth profile does not contain an email');
//     }

//     let user = await this.findByEmail(email);

//     if (!user) {
//       user = this.usersRepo.create({
//         email,
//         password: '',
//         role: Role.User, // ✅ Use enum value
//       });
//       await this.usersRepo.save(user);
//     }

//     return user;
//   }

//   remove(id: number) {
//     return this.usersRepo.delete(id);
//   }

//   updateRole(id: number, role: Role) {
//     return this.usersRepo.update(id, { role }); // ✅ Strong typing using Role enum
//   }
// }

// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/roles/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
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
