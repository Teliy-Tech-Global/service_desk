import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service'; // Use AuthService instead

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      authorizationURL: configService.get<string>('OAUTH_AUTH_URL'),
      tokenURL: configService.get<string>('OAUTH_TOKEN_URL'),
      clientID: configService.get<string>('OAUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('OAUTH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OAUTH_CALLBACK_URL'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const email = profile?.email || profile?._json?.email;
    if (!email) {
      throw new Error('No email found in OAuth profile');
    }

    // Use AuthService for user lookup/creation
    const user = await this.authService.validateOAuthLogin({ email, profile });

    return user;
  }
}
