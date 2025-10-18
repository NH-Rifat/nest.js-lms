import { RegisterUserDto } from './../auth/dto/registerUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(registerUserDto: RegisterUserDto, hashedPassword: string) {
    return {
      message: 'User created successfully',
      user: registerUserDto,
      password: hashedPassword,
    };
  }
}
