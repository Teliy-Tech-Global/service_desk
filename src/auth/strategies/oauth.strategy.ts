import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, 'oauth') {
  constructor(private readonly configService: ConfigService) {
    super({
      authorizationURL: configService.get<string>('OAUTH_AUTH_URL')!,
      tokenURL: configService.get<string>('OAUTH_TOKEN_URL')!,
      clientID: configService.get<string>('OAUTH_CLIENT_ID')!,
      clientSecret: configService.get<string>('OAUTH_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('OAUTH_CALLBACK_URL')!,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    params: any, // token response
    profile: any, // undefined unless fetched manually
    done: Function,
  ): Promise<any> {
    try {
      // Manually fetch Google user profile
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const user = {
        accessToken,
        refreshToken,
        profile: data, // Contains email, name, etc.
      };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
