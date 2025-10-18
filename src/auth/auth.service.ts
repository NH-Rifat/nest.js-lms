import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    // Check if user already exists
    // const existingUser = await this.userService.findByEmail(
    //   registerUserDto.email,
    // );
    // if (existingUser) {
    //   // throw new Error('User with this email already exists');
    //   return { message: 'User with this email already exists' };
    // }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );

    try {
      // Create user in database
      const createdUser = await this.userService.createUser(
        registerUserDto,
        hashedPassword,
      );

      // Return user data without password
      return {
        message: 'User created successfully',
        user: {
          fname: createdUser.fname,
          lname: createdUser.lname,
          email: createdUser.email,
        },
      };
    } catch (err: unknown) {
      const e = err as { code?: number };
      const DUPLICATE_KEY_CODE = 11000;
      if (e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('User with this email already exists');
      }
      throw err;
    }
  }
}
