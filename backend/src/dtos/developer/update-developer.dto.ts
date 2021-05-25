import { User } from './../../models/User';

import {
  IsArray,
  IsDate,
  IsNumber,
  IsMongoId,
  IsString,
} from 'class-validator';

export class UpdateDeveloperDto {
  @IsString({ message: "The 'firstName' value must alphanumeric." })
  readonly firstName: string;

  @IsString({ message: "The 'lastName' value must alphanumeric." })
  readonly lastName: string;

  @IsString({ message: "The 'location' value must alphanumeric." })
  readonly location: string;

  @IsDate({ message: "The 'dateOfBirth' value must be a Date." })
  readonly dateOfBirth: Date;

  @IsArray({ message: "The 'languages' field must be a string array." })
  readonly languages: Array<string>;

  @IsNumber({}, { message: "The 'yearsOfExperience' field must be a number." })
  readonly yearsOfExperience: number;

  @IsMongoId({ message: "The 'user' value is invalid." })
  readonly user: User['_id'];
}
