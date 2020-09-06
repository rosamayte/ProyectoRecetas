import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(name: string, password: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    const user = await this.usersService.findUser(name);
    if(!user) return null;
    const compare = await bcrypt.compare(password, user.password)
    // if (user && user.password === pass) {
    if (user && compare) {
      const { password, ...result } = user;
      // for(let e in result){
      //   console.log(e)
      // }
      // console.log(result['_doc'])
      return result['_doc'];
    }
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(user: any): Promise<any> {
    //NOTES: payload es el objeto q se guarda en el token
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}