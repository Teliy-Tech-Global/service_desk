// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { User } from './user.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])], // 👈 necessary for injecting User repository
//   providers: [UsersService],
//   controllers: [UsersController],
//   exports: [UsersService], // 👈 required to access UsersService in AuthModule or OAuth Strategy
// })
// export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule], // 👈 export the TypeOrmModule
})
export class UsersModule {}
