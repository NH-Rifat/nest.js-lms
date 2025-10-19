import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );

    // try {
    // Create user in database
    const createdUser = await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });

    const payload = { sub: createdUser?._id };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);
    return { access_token: token };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto?.email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto?.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = { sub: user._id };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
