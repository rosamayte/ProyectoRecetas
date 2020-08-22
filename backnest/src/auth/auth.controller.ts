import { Controller, UseGuards, Post, Req, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { data } from 'src/app.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    if (req.user['error']) return res.status(HttpStatus.UNAUTHORIZED).json(data(
      null, HttpStatus.UNAUTHORIZED, false
    ))
    return this.authService.login(req.user);
  }
}