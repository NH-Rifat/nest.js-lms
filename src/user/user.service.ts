import { RegisterUserDto } from './../auth/dto/registerUser.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (err: unknown) {
      const e = err as { code?: number };
      const DUPLICATE_KEY_CODE = 11000;
      if (e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('User with this email already exists');
      }
      throw err;
    }
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async getUserById(userId: string) {
    return this.userModel.findOne({ _id: userId });
  }
}
