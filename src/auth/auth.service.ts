import { Injectable } from '@nestjs/common';
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
    const existingUser = await this.userService.findByEmail(
      registerUserDto.email,
    );
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

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
    } catch (error) {
      throw new Error(
        'Failed to create user: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  }
}
