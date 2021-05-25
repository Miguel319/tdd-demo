import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  UsePipes,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';

import { CreateCompanyDto } from '../../dtos/company/create-company.dto';
import { CompanyService } from '../../services/company/company.service';
import { Company } from 'src/models/Company';
import { sendWriteRes } from '../../utils/res-handler';

import { Response } from 'express';
import { UpdateCompanyDto } from '../../dtos/company/update-company.dto';
import { validateFieldsOnUpdt } from '../../utils/updt-validation';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { HasRoles } from '@/decorators/roles.decorator';
import { Role } from '../../models/User';
import { AuthService } from '../../services/auth/auth.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll(): Promise<Array<Company>> {
    return await this.companyService.getAll();
  }

  @Get(':_id')
  async findById(@Param('_id') _id: Company['_id']): Promise<Company> {
    return await this.companyService.getById(_id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.COMPANY)
  async create(
    @Res() res: Response,
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Response> {
    const { user } = createCompanyDto;

    const companiesFromUser = await this.companyService.getFromUser(user);

    if (companiesFromUser)
      throw new ForbiddenException(
        'You already have one company associated to your account.',
      );

    const company: Company = await this.companyService.create(createCompanyDto);

    return sendWriteRes({
      res,
      message: 'Company created successfully!',
      status: HttpStatus.CREATED,
      meta: {
        company,
      },
    });
  }

  @Put(':_id')
  async update(
    @Res() res: Response,
    @Param('_id') _id: Company['_id'],
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Response> {
    await this.companyService.getById(_id); // Throws Error if not found.

    validateFieldsOnUpdt(updateCompanyDto);

    await this.companyService.update(_id, updateCompanyDto);

    return sendWriteRes({
      res,
      message: 'Company updated successfully!',
      status: HttpStatus.OK,
    });
  }

  @Delete(':_id')
  async delete(
    @Res() res: Response,
    @Param('_id') _id: Company['_id'],
  ): Promise<Response> {
    await this.companyService.delete(_id);

    return sendWriteRes({
      res,
      message: 'Company deleted successfully!',
      status: HttpStatus.OK,
    });
  }
}
