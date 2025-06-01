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
  providers: [AuthService, OAuth2Strategy, SessionSerializer],
})
export class AuthModule {}
