import { Module, forwardRef } from '@nestjs/common';
import { CompaniesController } from '../controllers/companies/companies.controller';
import { CompanyService } from '../services/company/company.service';
import { MongooseModule } from '@nestjs/mongoose';
import CompanySchema from 'src/models/Company';
import UserSchema from '@/models/User';
import { AuthModule } from './auth.module';
import { AuthService } from '../services/auth/auth.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Company',
        schema: CompanySchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompanyService],
})
export class CompanyModule {}
