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

// src/auth/auth.controller.ts
// import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Response, Request } from 'express';

// @Controller('auth')
// export class AuthController {
//   // Start OAuth login flow
//   @Get('login')
//   @UseGuards(AuthGuard('oauth'))
//   login() {
//     // Handled by Passport (redirects to provider)
//   }}

//   // Handle OAuth callback
//   @Get('callback')
//   @UseGuards(AuthGuard('oauth'))
//   callback(@Req() req: Request, @Res() res: Response) {
//     // You can inspect or store the user in session
//     // req.user is set by the OAuth2Strategy's validate() return value
//     // For now, redirect to a frontend page or dashboard

//     // Example: Store user in session (optional if using sessions)
//     req.session.user = req.user;

//     // Redirect or return data
//     return res.redirect('/dashboard'); // Update this to your frontend/dashboard URL
//   }

//   // Optional: show current logged-in user
//   @Get('me')
//   getProfile(@Req() req: Request) {
//     return req.user;
//   }
// }
