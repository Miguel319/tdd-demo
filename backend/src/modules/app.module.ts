import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JobPostModule } from './job-post.module';
import { AuthModule } from './auth.module';
import { DeveloperModule } from './developer.module';
import { AuthService } from '../services/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    DeveloperModule,
    CompanyModule,
    JobPostModule,
    MongooseModule.forRoot(String(process.env.DB_URI), {
      useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex: true,
      keepAlive: true,
    }),
  ],
  // providers: [ AuthService],
  // exports: [AuthModule]
})
export class AppModule {}
