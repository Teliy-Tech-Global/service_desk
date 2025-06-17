import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, 'oauth') {
  constructor(private readonly configService: ConfigService) {
    super({
      // These must be defined in your environment or config
      authorizationURL: configService.get<string>('OAUTH_AUTH_URL')!,
      tokenURL: configService.get<string>('OAUTH_TOKEN_URL')!,
      clientID: configService.get<string>('OAUTH_CLIENT_ID')!,
      clientSecret: configService.get<string>('OAUTH_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('OAUTH_CALLBACK_URL')!,
      passReqToCallback: true,
    });
  }

  // This method is called when OAuth2 login is successful
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    // Extract user info from profile or token
    const user = {
      accessToken,
      refreshToken,
      profile,
    };

    // You can fetch or create the user in your DB here

    return done(null, user);
  }
}
