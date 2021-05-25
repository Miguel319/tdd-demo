import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import JobPostSchema from 'src/models/JobPost';
import { JobPostsController } from '../controllers/job-posts/job-posts.controller';
import { JobPostsService } from '../services/job-posts/job-posts.service';
import CompanySchema from 'src/models/Company';
import { CompanyService } from '../services/company/company.service';
import { DeveloperService } from '../services/developer/developer.service';
import DeveloperSchema from 'src/models/Developer';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'JobPost',
        schema: JobPostSchema,
      },
      {
        name: 'Company',
        schema: CompanySchema,
      },
      {
        name: 'Developer',
        schema: DeveloperSchema,
      },
    ]),
  ],
  controllers: [JobPostsController],
  providers: [JobPostsService, CompanyService, DeveloperService],
})
export class JobPostModule {}
