import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersModule } from './users.module';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const hp = await bcrypt.hash(createdUser.password, 10);
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

  async updateUser(user: IUser): Promise<User> {
    // return this.userModel.findByIdAndUpdate(user._id, user).exec();
    const u = await this.userModel.findById(user._id);
    if (!u) return null;
    u.set(user);
    if (user.password) {
      const hp = await bcrypt.hash(user.password, 10);
      u.password = hp
    }
    return await u.save();
  }

  async setImageProfile(id: string, name: string): Promise<User> {
    const u = await this.userModel.findById(id);
    if (!u) return null;
    u.image = await name;
    return await u.save()
  }

  async deleteUser(_id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(_id).exec();
  }
}
