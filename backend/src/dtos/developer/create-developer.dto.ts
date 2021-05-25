import { User } from './../../models/User';

import { IsValidDate } from '../../decorators/is-valid-date.decorator';

import {
  IsNumber,
  IsArray,
  IsDefined,
  IsMongoId,
  IsString,
} from 'class-validator';

export class CreateDeveloperDto {
  @IsDefined({ message: "The 'firstName' field is required." })
  @IsString({ message: "The 'firstName' value must alphanumeric." })
  readonly firstName: string;

  @IsDefined({ message: "The 'lastName' field is required." })
  @IsString({ message: "The 'lastName' value must alphanumeric." })
  readonly lastName: string;

  @IsString({ message: "The 'location' value must alphanumeric." })
  readonly location: string;

  @IsDefined({ message: "The 'dateOfBirth' field is required." })
  @IsValidDate({
    message: "The 'dateOfBirth' value must be a Date: 'YYYY-MM-DD'.",
  })
  readonly dateOfBirth: Date;

  @IsArray({ message: "The 'languages' field must be a string array." })
  readonly languages: Array<string>;

  @IsDefined({ message: "The 'yearsOfExperience' field is required." })
  @IsNumber({}, { message: "The 'yearsOfExperience' field must be a number." })
  readonly yearsOfExperience: number;

  @IsDefined({ message: "The 'user' field is required." })
  @IsMongoId({ message: "The 'user' value is invalid." })
  readonly user: User['_id'];
}
