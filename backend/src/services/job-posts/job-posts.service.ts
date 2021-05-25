import { Company } from './../../models/Company';
import { JobPost } from './../../models/JobPost';
import { Developer } from './../../models/Developer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobPostDto } from '../../dtos/job-posts/create-job-post.dto';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectModel('JobPost') private readonly jobPostModel: Model<JobPost>,
  ) {}

  async getAll(): Promise<Array<JobPost>> {
    return await this.jobPostModel.find({});
  }

  async getAllFromCompany(companyId: Company['_id']): Promise<Array<Company>> {
    return await this.jobPostModel.find({ company: companyId });
  }

  async create(createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    return await (this.jobPostModel as any).create(createJobPostDto);
  }

  async update(
    _id: Company['_id'],
    updatedJobPost: CreateJobPostDto,
  ): Promise<void> {
    await this.jobPostModel.updateOne({ _id }, [updatedJobPost]);
  }

  async apply(jobPost: JobPost, developerId: Developer['_id']) {
    jobPost.applicants.push(developerId);
    await jobPost.save();
  }

  async getById(_id: JobPost['_id']): Promise<JobPost> {
    const jobPost: JobPost = await this.jobPostModel.findById(_id);

    if (!jobPost)
      throw new NotFoundException(
        'Could not find any job post with the _id provided.',
      );

    return jobPost;
  }

  async delete(_id: JobPost['_id']): Promise<void> {
    await this.jobPostModel.deleteOne(_id);
  }

  setCompany(createJobPostDto: CreateJobPostDto, company: Company): void {
    (createJobPostDto as any).company = {
      _id: company._id,
      name: company.name,
      img: company.img,
    };
  }
}
