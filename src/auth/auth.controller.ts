import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('oauth'))
  login() {
    return;
  }
  @Get('callback')
  @UseGuards(AuthGuard('oauth'))
  callback(@Req() req) {
    return req.user;
  }
}
