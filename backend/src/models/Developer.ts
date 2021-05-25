import { JobPost } from './JobPost';
import { Document, Schema, Types } from 'mongoose';
import { User } from './User';

const { ObjectId } = Types;

export interface Developer extends Document {
  firstName?: string;
  lastName?: string;
  location?: string;
  languages?: Array<string>;
  technologies: Array<string>;
  yearsOfExperience?: number;
  dateOfBirth?: Date;
  jobsAppliedTo?: Array<JobPost['_id']>;
  user?: User['_id'];
  _doc?: any;
}

const DeveloperSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'The name is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'The last name is required.'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'The date of birth is required.'],
    },
    location: {
      type: String,
    },
    languages: [{ type: String }],
    technologies: [{ type: String }],
    yearsOfExperience: {
      type: Number,
    },
    jobsAppliedTo: [
      {
        type: ObjectId,
        ref: 'JobPost',
      },
    ],
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default DeveloperSchema;
