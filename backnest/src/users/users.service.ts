import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.userModel.find().exec();
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
