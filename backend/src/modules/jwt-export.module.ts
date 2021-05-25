import { JwtModule, JwtService } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from '@/models/User';
import { AuthModule } from './auth.module';
import { RolesGuard } from '../guards/roles.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService, JwtService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '100d' },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtExportModule {}
