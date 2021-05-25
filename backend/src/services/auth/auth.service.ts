import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/User';
import { Model } from 'mongoose';
import { Response } from 'express';
import { SignUpDtp } from '../../dtos/auth/sign-up.dto';
import { Company } from '../../models/Company';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  static readonly unauthorizedTxt: string =
    'Invalid credentials. Please, check and try again.';

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async getUserById(_id: User['_id']): Promise<User> {
    return this.userModel.findById(_id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('+password');
  }

  private getToken({ email, _id, name, role }: User): string {
    return this.jwtService.sign({ id: _id, name, email, role });
  }

  private setupOptions(): void {
    const options: any = { httpOnly: true };

    if (process.env.NODE_ENV === 'production') options.secure = true;
  }

  async getCurrentUser(): Promise<User | null> {
    const userId = (this.request?.user as any)?.id;

    if (!userId) return null;

    const user: User | null = await this.userModel.findById(userId);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt: any = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async createUser(user: SignUpDtp): Promise<User> {
    user.password = await this.hashPassword(user.password);

    return await this.userModel.create(user as User);
  }

  async addUserToEntity(user: User, entity: Company): Promise<void> {
    entity.user = user._id;

    this.saveChanges(entity);
  }

  private async saveChanges(entity: any): Promise<void> {
    await entity.save();
  }

  sendTokenResponse(
    user: User,
    statusCode: HttpStatus,
    res: Response,
    operation: string,
  ): Response {
    const token: string = this.getToken(user);

    this.setupOptions();

    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res
      .status(statusCode)
      .cookie('token', token)
      .json({
        success: true,
        user: userObj,
        message: `${
          operation === 'sign up' ? 'Signed up' : 'Signed in'
        } successfully!`,
        token,
      });
  }

  async isPasswordRight(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
