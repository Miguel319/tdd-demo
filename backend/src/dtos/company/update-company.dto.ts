import { IsString, IsNumber } from 'class-validator';

export class UpdateCompanyDto {
  @IsString({ message: "The 'name' value must be alphanumeric." })
  readonly name: string;

  @IsString({ message: "The 'owner' value must be alphanumeric." })
  readonly owner: string;

  @IsString({ message: "The 'addressLine1' value must be alphanumeric." })
  readonly addressLine1: string;

  @IsString({ message: "The 'city' value must be alphanumeric." })
  readonly city: string;

  @IsString({ message: "The 'state' value must be alphanumeric." })
  readonly state: string;

  @IsString({ message: "The 'zipCode' value must be alphanumeric." })
  readonly zipCode: string;

  @IsNumber({}, { message: "The 'netWorth' value must be numeric." })
  readonly netWorth: number;
}
