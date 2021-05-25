import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompanyDto } from '../../dtos/company/create-company.dto';
import { Model } from 'mongoose';
import { UpdateCompanyDto } from '../../dtos/company/update-company.dto';
import { Company } from 'src/models/Company';
import { JobPost } from 'src/models/JobPost';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<Company>,
  ) {}

  async getAll(): Promise<Array<Company>> {
    return await this.companyModel.find({});
  }

  async getFromUser(_id: string): Promise<Company> {
    return await this.companyModel.findOne({ user: _id });
  }

  async getById(_id: Company['_id']): Promise<Company> {
    const company: Company = await this.companyModel.findById(_id);

    if (!company)
      throw new NotFoundException(
        'Could not find any company with the _id provided.',
      );

    return company;
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    return await this.companyModel.create(company);
  }

  async update(_id: Company['_id'], company: UpdateCompanyDto): Promise<any> {
    return await this.companyModel.updateOne({ _id }, company);
  }

  async delete(_id: Company['_id']) {
    return await this.companyModel.deleteOne({ _id });
  }

  async pushJobPost(company: Company, jobPostId: JobPost['_id']) {
    company.jobPosts.push(jobPostId);
    await this.saveChanges(company);
  }

  validateFieldsOnUpdt(company: UpdateCompanyDto): void {
    const areAllFieldsEmpty: boolean = Object.values(
      company,
    ).some((property: any) => Boolean(property));

    if (!areAllFieldsEmpty)
      throw new BadRequestException('You must update at least one field.');
  }

  private async saveChanges(company: Company): Promise<void> {
    await company.save();
  }
}
