import { Controller, Post, Body, Res, HttpStatus, Get, Patch, Delete, Param, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user';
import { Response } from 'express';
import { data } from 'src/app.service';

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

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
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
    @Body() body: User,
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
