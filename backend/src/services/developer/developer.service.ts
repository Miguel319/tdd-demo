import { User } from './../../models/User';
import { Developer } from './../../models/Developer';

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeveloperDto } from '../../dtos/developer/create-developer.dto';
import { UpdateDeveloperDto } from '../../dtos/developer/update-developer.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel('Developer') private readonly developerModel: Model<Developer>,
    private readonly authService: AuthService,
  ) {}

  async getAll(): Promise<Array<Developer>> {
    return await this.developerModel.find({});
  }

  async getById(_id: Developer['_id']): Promise<Developer> {
    const developer: Developer = await this.developerModel.findById(_id);

    if (!developer)
      throw new NotFoundException(
        'Could not find any developer with the _id provided.',
      );

    return developer;
  }

  async create(developer: CreateDeveloperDto): Promise<Developer> {
    const user: User = await this.authService.getUserById(developer.user);

    if (user.role !== 'Developer')
      throw new BadRequestException("The user role must be 'Developer'.");

    const newDeveloper: Developer = await this.developerModel.create(developer);

    this.authService.addUserToEntity(user, newDeveloper);

    return newDeveloper;
  }

  async update(
    _id: Developer['_id'],
    developer: UpdateDeveloperDto,
  ): Promise<any> {
    return await this.developerModel.updateOne({ _id }, developer);
  }
}
