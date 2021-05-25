import { CreateJobPostDto } from '../../dtos/job-posts/create-job-post.dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';
import { sendWriteRes } from '../../utils/res-handler';
import { JobPost } from 'src/models/JobPost';

import { CompanyService } from '../../services/company/company.service';
import { Company } from 'src/models/Company';
import { JobPostsService } from 'src/services/job-posts/job-posts.service';
import { ApplyToJobPost } from '../../dtos/job-posts/apply-to-job-post';
import { DeveloperService } from '../../services/developer/developer.service';
import { validateFieldsOnUpdt } from '../../utils/updt-validation';

@Controller('job-posts')
export class JobPostsController {
  constructor(
    private jobPostService: JobPostsService,
    private companyService: CompanyService,
    private developerService: DeveloperService,
  ) {}

  @Get()
  async getAll(): Promise<Array<JobPost>> {
    return this.jobPostService.getAll();
  }

  @Get('companies/:_id')
  async getAllFromCompany(@Param('_id') _id: Company['_id']) {
    return this.jobPostService.getAllFromCompany(_id);
  }

  @Get(':_id')
  async getByID(@Param('_id') _id: JobPost['_id']): Promise<JobPost> {
    return this.jobPostService.getById(_id);
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() createJobPostDto: CreateJobPostDto,
  ): Promise<Response> {
    const company: Company = await this.companyService.getById(
      createJobPostDto.company,
    );

    this.jobPostService.setCompany(createJobPostDto, company);

    const jobPost = await (await this.jobPostService.create(createJobPostDto))
      ._doc;

    await this.companyService.pushJobPost(company, jobPost._id);

    return sendWriteRes({
      res,
      status: HttpStatus.CREATED,
      message: 'Job post added successfully!',
      meta: {
        jobPost,
      },
    });
  }

  @Put(':_id')
  async update(
    @Res() res: Response,
    @Param('_id') _id: JobPost['_id'],
    updatedJobPost: CreateJobPostDto,
  ) {
    await this.companyService.getById(updatedJobPost.company); // Throws Error if not found

    await this.jobPostService.getById(_id); // Throws Error if not found

    validateFieldsOnUpdt(updatedJobPost);

    await this.jobPostService.update(_id, updatedJobPost);

    return sendWriteRes({
      res,
      status: HttpStatus.OK,
      message: 'Job post updated successfully!',
    });
  }

  @Post(':_id/apply')
  async apply(
    @Res() res: Response,
    @Param('_id') _id: JobPost['_id'],
    @Body() { developerId }: ApplyToJobPost,
  ) {
    await this.developerService.getById(developerId);

    const jobPost: JobPost = await this.jobPostService.getById(_id);

    this.jobPostService.apply(jobPost, developerId);

    return sendWriteRes({
      res,
      status: HttpStatus.CREATED,
      message: "You've applied successfully!",
    });
  }

  @Delete(':_id')
  async delete(
    @Res() res: Response,
    @Param('_id') _id: JobPost['_id'],
  ): Promise<Response> {
    await this.jobPostService.delete(_id);

    return sendWriteRes({
      message: 'Job post deleted successfully!',
      res,
      status: HttpStatus.OK,
    });
  }
}
