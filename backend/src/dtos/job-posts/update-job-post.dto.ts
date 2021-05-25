import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';
import { ShiftType } from '../../models/JobPost';

export class UpdateJobPostDto {
  @IsString({ message: "The 'title' value must be alphanumeric." })
  readonly title: string;

  @IsString({ message: "The 'description' value must be alphanumeric." })
  readonly description: string;

  @IsNumber({}, { message: "The 'salary' value must be a number." })
  readonly salary?: number;

  @IsNumber({}, { message: "The 'yearsOfExperience' value must be a number." })
  readonly yearsOfExperience?: number;

  @IsArray({
    message: "The 'responsabilities' value must be a string array.",
  })
  readonly responsibilities?: Array<String>;

  @IsArray({
    message: "The 'techhnologiesRequired' field must be a string array.",
  })
  readonly technologiesRequired?: Array<String>;

  @IsEnum(ShiftType, {
    message: "The 'type' value must be either 'Full-Time' or 'Part-Time'.",
  })
  readonly type: ShiftType;

  @IsString({ message: "The 'schedule' value must be alphanumeric." })
  readonly schedule?: string;

  @IsString({ message: "The 'otherDetails' value must be alphanumeric." })
  readonly otherDetails?: string;
}
