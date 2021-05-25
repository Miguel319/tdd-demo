import { IsValidEmail } from '../../decorators/is-valid-email.decorator';
import { IsNotEmpty } from '../../decorators/is-not-empty.decorator';

export class SignInDto {
  @IsNotEmpty()
  @IsValidEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
