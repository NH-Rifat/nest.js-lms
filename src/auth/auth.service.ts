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
    // console.log(registerUserDto);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );
    // console.log(registerUserDto.password, hashedPassword);

    // logic for user register
    /*
      1. check if user email already exists
      2. hash the password
      3. save the user to the database
      4. generate a JWT token
      5. return the token
    */
    return this.userService.createUser(registerUserDto, hashedPassword);
  }
}
