
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { DeveloperService } from 'src/services/developer/developer.service';
import { CreateDeveloperDto } from '../../dtos/developer/create-developer.dto';
import { Response } from 'express';
import { sendWriteRes } from '../../utils/res-handler';
import { UpdateDeveloperDto } from '../../dtos/developer/update-developer.dto';
import { validateFieldsOnUpdt } from '../../utils/updt-validation';
import { Developer } from '@/models/Developer';

@Controller('developers')
export class DevelopersController {
  constructor(private developerService: DeveloperService) {}

  @Get()
  async getAll(): Promise<Array<Developer>> {
    return await this.developerService.getAll();
  }

  @Get(':_id')
  async getById(@Param() _id: Developer['_id']): Promise<Developer> {
    return await this.developerService.getById(_id);
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() createDeveloperDto: CreateDeveloperDto,
  ) {
    const developer: Developer = await this.developerService.create(
      createDeveloperDto,
    );

    return sendWriteRes({
      res,
      status: HttpStatus.CREATED,
      message: 'Developer created successfully!',
      meta: {
        developer,
      },
    });
  }

  @Put(':_id')
  async update(
    @Res() res: Response,
    @Param('_id') _id: Developer['_id'],
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    await this.developerService.getById(_id); // Throws error if not found

    validateFieldsOnUpdt(updateDeveloperDto);

    await this.developerService.update(_id, updateDeveloperDto);

    return sendWriteRes({
      res,
      status: HttpStatus.CREATED,
      message: 'Developer updated successfully!',
    });
  }
}
