import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const hp = await bcrypt.hash(createdUser.password,10);
    createdUser.password = await hp;
    return createdUser.save()
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.userModel.find().exec();
  }

  async findUser(name: string): Promise<User | undefined> {
    return this.userModel.findOne({ name });
  }

  async getUserById(_id: string): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async updateUser(user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(user._id, user).exec();
  }

  async deleteUser(_id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(_id).exec();
  }
}
