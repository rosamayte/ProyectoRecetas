import { Controller, UseGuards, Post, Req, Res, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { data } from 'src/app.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    const token = await this.authService.login(req.user);
    res.status(HttpStatus.OK).json(data(
      token
    ))
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Req() req: Request,
    @Res() res: Response
  ):Promise<any>{
    const{password, iat, exp, ...resp} = req.user as any
    res.status(HttpStatus.OK).json(data(
      resp
    ))
  }
}