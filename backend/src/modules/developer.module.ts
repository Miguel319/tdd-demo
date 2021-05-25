import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import DeveloperSchema from 'src/models/Developer';
import { DevelopersController } from '../controllers/developers/developers.controller';
import { DeveloperService } from '../services/developer/developer.service';
import { AuthService } from '../services/auth/auth.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: 'Developer',
        schema: DeveloperSchema,
      },
    ]),
  ],
  controllers: [DevelopersController],
  providers: [DeveloperService],
  // exports: [AuthService]
})
export class DeveloperModule {}
