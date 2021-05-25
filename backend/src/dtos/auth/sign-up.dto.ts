import { IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../models/User';
import { IsValidEmail } from '../../decorators/is-valid-email.decorator';
import { IsNotEmpty } from '../../decorators/is-not-empty.decorator';

export class SignUpDtp {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsValidEmail({ message: 'Invalid email.' })
  readonly email: string;

  @IsNotEmpty()
  @IsString({ message: "The 'password' value must be alphanumeric." })
  @MinLength(6, { message: 'The password must have at least 6 characters.' })
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: "The role must be either 'Company' or 'Developer'.",
  })
  readonly role: string;
}
