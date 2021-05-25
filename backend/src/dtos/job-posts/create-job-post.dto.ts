import { ShiftType } from '../../models/JobPost';
import { Company } from '../../models/Company';
import {
  IsString,
  IsDefined,
  IsNumber,
  IsMongoId,
  IsArray,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateJobPostDto {
  @IsDefined({ message: "The 'title' field is required." })
  @IsString({ message: "The 'title' value must be alphanumeric." })
  @IsNotEmpty({ message: "The 'title' field is required." })
  readonly title: string;

  @IsDefined({ message: "The 'description' field is required." })
  @IsString({ message: "The 'description' value must be alphanumeric." })
  @IsNotEmpty({message: "The 'description' field is required."})
  readonly description: string;

  @IsNumber({}, { message: "The 'salary' value must be a number." })
  readonly salary?: number;

  @IsDefined({ message: "The 'years of experience' field is required." })
  @IsNumber({}, { message: "The 'yearsOfExperience' value must be a number." })
  @IsNotEmpty({ message: "The 'years of experience' field is required." })
  readonly yearsOfExperience?: number;

  @IsArray({
    message: "The 'responsabilities' value must be a string array.",
  })
  readonly responsibilities?: Array<String>;

  @IsArray({
    message: "The 'techhnologiesRequired' field must be a string array.",
  })
  readonly technologiesRequired?: Array<String>;

  @IsDefined({ message: "The shift type field is required." })
  @IsEnum(ShiftType, {
    message: "The shift type value must be either 'Full-Time' or 'Part-Time'.",
  })
  @IsNotEmpty({ message: "The shift type field is required." })
  readonly shiftType: ShiftType;

  @IsString({ message: "The 'schedule' value must be alphanumeric." })
  readonly schedule?: string;

  @IsString({ message: "The 'otherDetails' value must be alphanumeric." })
  readonly otherDetails?: string;

  @IsDefined({ message: "The 'company' field is required." })
  @IsMongoId({ message: "The 'company' value must be a valid MongoDB _id." })
  @IsNotEmpty({ message: "The 'company' field is required." })
  company: Company['_id'];
}
