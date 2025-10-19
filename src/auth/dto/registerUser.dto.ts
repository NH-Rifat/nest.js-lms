/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'First name should not be empty' })
  fname: string;

  @IsNotEmpty({ message: 'Last name should not be empty' })
  lname: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @MinLength(6, {
    message: 'Password is too short. Minimum length is 6 characters',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
