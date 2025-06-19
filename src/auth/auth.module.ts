import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import OAuth2Strategy from 'passport-oauth2';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    forwardRef(() => UsersModule), // ✅ Circular dependency fix
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, OAuth2Strategy, SessionSerializer],
  exports: [AuthService], // ✅ Exported if UsersService needs it
})
export class AuthModule {}
