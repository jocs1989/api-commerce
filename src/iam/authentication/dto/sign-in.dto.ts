import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';

export class SignInDto extends PartialType(SignUpDto) {
  readonly email: string;

  readonly password: string;
}
