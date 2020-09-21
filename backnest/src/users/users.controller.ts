import { Controller, Post, Body, Res, HttpStatus, Get, Patch, Delete, Param, HttpCode, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user';
import { Response, Request } from 'express';
import { data } from 'src/app.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUser } from 'src/interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @Post()
  async addUser(
    @Body() body: User,
    @Res() res: Response
  ): Promise<void> {
    this.service.addUser(body).then((user: User) => {
      if (!user) return res.status(HttpStatus.BAD_REQUEST).json(data(
        null, HttpStatus.BAD_REQUEST, false
      ));
      user.password = undefined
      res.status(HttpStatus.OK).json(data(
        user
      ));
    }, err => {
      if (err._message === "User validation failed") return res.status(HttpStatus.BAD_REQUEST).json(data(
        err, HttpStatus.BAD_REQUEST, false
      ));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Get()
  async getAllUsers(
    @Res() res: Response
  ): Promise<void> {
    this.service.getAllUsers().then((users: Array<User>) => {
      if (!users || users.length < 1) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        users
      ));
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request
  ): Promise<void> {
    // console.log('req \n',req.user)
    if(req.user && req.user['JsonWebTokenError']) {
      res.status(HttpStatus.UNAUTHORIZED).json(data(
        req.user['JsonWebTokenError'], HttpStatus.UNAUTHORIZED, false
      ));
      return
    }
    this.service.getUserById(id).then((user: User) => {
      if (!user) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        user
      ));
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Patch()
  async updateUser(
    @Body() body: IUser,
    @Res() res: Response
  ): Promise<void> {
    this.service.updateUser(body).then((user: User) => {
      if (!user) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        body
      ));
    }, err => {
      if (err._message === "User validation failed") return res.status(HttpStatus.BAD_REQUEST).json(data(
        err, HttpStatus.BAD_REQUEST, false
      ));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Patch('image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageProfile(
    @UploadedFile() image,
    @Res() res: Response,
    @Param('id') id: string
  ) {
    if (!image)
      return res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).json(data(
        null, HttpStatus.UNSUPPORTED_MEDIA_TYPE, false
      ));
    this.service.setImageProfile(id, image.originalname).then((u: User) => {
      if (!u) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        u
      ));
    }, err => {
      res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).json(data(
        err, HttpStatus.UNSUPPORTED_MEDIA_TYPE, false
      ));
    });
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.service.deleteUser(id).then((user: User) => {
      if (!user) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        user
      ));
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }
}
