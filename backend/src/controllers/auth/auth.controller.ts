import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from '../../services/auth/auth.service';
import { SignUpDtp } from '../../dtos/auth/sign-up.dto';
import { Response } from 'express';
import { User } from '../../models/User';
import { SignInDto } from '../../dtos/auth/sign-in.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Res() res: Response, @Body() signUpDto: SignUpDtp) {
    const newUser: User = await this.authService.createUser(signUpDto);

    return this.authService.sendTokenResponse(
      newUser,
      HttpStatus.CREATED,
      res,
      'sign up',
    );
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser() {
    const user: null | User = await this.authService.getCurrentUser();

    return user;
  }

  @Post('sign-in')
  async signIn(@Res() res: Response, @Body() { email, password }: SignInDto) {
    const user: User = await this.authService.getUserByEmail(email);

    if (!user) throw new UnauthorizedException(AuthService.unauthorizedTxt);

    const passwordRight: boolean = await this.authService.isPasswordRight(
      user,
      password,
    );

    if (!passwordRight)
      throw new UnauthorizedException(AuthService.unauthorizedTxt);

    return this.authService.sendTokenResponse(
      user,
      HttpStatus.OK,
      res,
      'sign in',
    );
  }
}
