import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { UsersModule } from '../users/users.module';
import { OAuthStrategy } from './strategies/oauth.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, OAuthStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
