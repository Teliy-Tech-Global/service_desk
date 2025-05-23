// // src/users/users.controller.ts
// import {
//   Controller,
//   Post,
//   Body,
//   Get,
//   Param,
//   Delete,
//   UseGuards,
//   Req,
//   ForbiddenException,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
// import { RolesGuard } from '../auth/roles/roles.guard';
// import { Roles } from '../auth/roles/roles.decorator';
// import { Role } from '../auth/roles/roles.enum';
// import { Request } from 'express';

// @Controller('users')
// @UseGuards(AuthenticatedGuard, RolesGuard) // global for this controller
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   // Only Admin can create users
//   @Post()
//   @Roles(Role.Admin)
//   create(@Body() dto: CreateUserDto) {
//     return this.usersService.create(dto);
//   }

//   // Only Admin can view all users
//   @Get()
//   @Roles(Role.Admin)
//   findAll() {
//     return this.usersService.findAll();
//   }

//   // Admin can get any user, normal user can only get their own data
//   @Get(':id')
//   @Roles(Role.Admin, Role.User)
//   async findById(@Param('id') id: string, @Req() req: Request) {
//     const user = req.user as any;
//     if (user.role !== Role.Admin && user.id !== +id) {
//       throw new ForbiddenException('You can only access your own profile');
//     }
//     return this.usersService.findById(+id);
//   }

//   // Only Admin can delete users
//   @Delete(':id')
//   @Roles(Role.Admin)
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(+id);
//   }
// }

// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { Request } from 'express';

@Controller('api/users')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findById(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    if (user.role !== Role.Admin && user.id !== +id) {
      throw new ForbiddenException('You can only access your own profile');
    }
    return this.usersService.findById(+id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
