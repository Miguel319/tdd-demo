import { IsMongoId, IsNumber, IsString } from 'class-validator';
import { IsNotEmpty } from '../../decorators/is-not-empty.decorator';

export class CreateCompanyDto {
  @IsString({ message: "The 'name' value must be alphanumeric." })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: "The 'owner' value must be alphanumeric." })
  @IsNotEmpty()
  readonly owner: string;

  @IsString({ message: "The 'addressLine1' value must be alphanumeric." })
  @IsNotEmpty({ message: "The 'address' field is required." })
  readonly addressLine1: string;

  @IsString({ message: "The 'city' value must be alphanumeric." })
  @IsNotEmpty()
  readonly city: string;

  @IsString({ message: "The 'state' value must be alphanumeric." })
  @IsNotEmpty()
  readonly state: string;

  @IsString({ message: "The 'zipCode' value must be alphanumeric." })
  @IsNotEmpty({ message: 'The zip code is required.' })
  readonly zipCode: string;

  @IsNumber({}, { message: "The 'net worth' value must be numeric." })
  @IsNotEmpty({ message: "The 'net worth' field is required." })
  readonly netWorth: number;

  @IsNumber({}, { message: "The 'employees count' value must be numeric." })
  @IsNotEmpty({ message: 'The number of employees is a required.' })
  readonly employeesCount: number;

  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid user id.' })
  readonly user: string;
}
