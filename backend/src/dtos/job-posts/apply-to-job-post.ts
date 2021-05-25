import { IsDefined, IsMongoId } from 'class-validator';
import { Developer } from './../../models/Developer';

export class ApplyToJobPost {
  @IsDefined({ message: 'The developerId is mandatory.' })
  @IsMongoId({ message: "The 'developerId' provided is invalid." })
  developerId: Developer['_id'];
}
