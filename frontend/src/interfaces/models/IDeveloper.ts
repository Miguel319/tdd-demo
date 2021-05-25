import { IJobPost } from './IJobPost';
import { IUser } from './IUser';

export interface IDeveloper {
    _id: string;
    name?: string;
    lastName?: string;
    location?: string;
    languages?: Array<string>;
    yearsOfExperience?: number;
    dateOfBirth?: Date;
    jobsAppliedTo?: Array<IJobPost['_id']>;
    user?: IUser['_id'];
    _doc?: any;
  }