// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { OAuth2Strategy } from './strategies/oauth.strategy';
// import { UsersModule } from '../users/users.module';
// import { SessionSerializer } from './session.serializer'; // ✅ Import serializer

// @Module({
//   imports: [
//     PassportModule.register({ session: true }), // ✅ Enable session support
//     UsersModule, // ✅ Import shared UsersModule
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, OAuth2Strategy, SessionSerializer], // ✅ Register all required providers
// })
// export class AuthModule {}

// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OAuth2Strategy } from './strategies/oauth.strategy';
import { SessionSerializer } from './session.serializer';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    TypeOrmModule.forFeature([User]), // ✅ Needed for UserRepository injection
  ],
  controllers: [AuthController],
  providers: [AuthService, OAuth2Strategy, SessionSerializer], // ✅ Add serializer here
})
export class AuthModule {}
