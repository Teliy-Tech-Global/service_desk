import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, 'oauth') {
  validate(...args: any[]): unknown {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly configService: ConfigService) {
    const authorizationURL = configService.get<string>('OAUTH_AUTH_URL');
    const tokenURL = configService.get<string>('OAUTH_TOKEN_URL');
    const clientID = configService.get<string>('OAUTH_CLIENT_ID');
    const clientSecret = configService.get<string>('OAUTH_CLIENT_SECRET');
    const callbackURL = configService.get<string>('OAUTH_CALLBACK_URL');

    // 👇 Add debug logs
    console.log('OAuth config:', {
      authorizationURL,
      tokenURL,
      clientID,
      clientSecret,
      callbackURL,
    });

    // 💥 If any are missing, throw early with clear message
    if (
      !authorizationURL ||
      !tokenURL ||
      !clientID ||
      !clientSecret ||
      !callbackURL
    ) {
      throw new Error('Missing one or more OAuth config values in .env');
    }

    super({
      authorizationURL,
      tokenURL,
      clientID,
      clientSecret,
      callbackURL,
      passReqToCallback: true,
    });
  }
}
