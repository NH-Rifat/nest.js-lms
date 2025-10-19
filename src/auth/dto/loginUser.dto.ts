/* eslint-disable @typescript-eslint/no-unsafe-call */
// email and password dto
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
