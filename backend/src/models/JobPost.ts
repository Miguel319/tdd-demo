import { Company } from './Company';
import { Types, Schema, Document } from 'mongoose';
import { Developer } from './Developer';

const { ObjectId } = Types;

export enum ShiftType {
  FULL_TIME = 'Full-Time',
  PART_TIME = 'Part-Time',
}

export interface JobPost extends Document {
  title?: string;
  description?: string;
  salary?: number;
  yearsOfExperience?: number;
  responsibilities?: Array<string>;
  technologiesRequired?: Array<string>;
  shiftType?: ShiftType;
  schedule?: string;
  otherDetails?: string;
  company?: {
    _id: {
      type: Company['_id'];
      ref: 'Company';
      required: [true, 'The company is required.'];
    };
    name: String;
    img: String;
  };
  applicants?: Array<Developer['_id']>;
  _doc?: any;
}

const JobPostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title of the opening is required.'],
    },
    description: {
      type: String,
      required: [true, "The job's description is required."],
      minlength: [
        100,
        "The job's description must have at least 100 characters.",
      ],
    },
    salary: {
      type: Number,
      default: 0,
    },
    yearsOfExperience: {
      type: Number,
      required: [true, 'The years of experience must be provided.'],
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    technologiesRequired: [
      {
        type: String,
      },
    ],
    shiftType: {
      type: String,
      required: [
        true,
        "The shift type must be provided: 'Part-Time' or 'Full-Time'.",
      ],
      enum: ['Part-Time', 'Full-Time'],
    },
    schedule: {
      type: String,
    },
    otherDetails: {
      type: String,
    },
    company: {
      _id: {
        type: ObjectId,
        ref: 'Company',
        required: [true, 'The company is required.'],
      },
      name: String,
      img: String,
    },
    applicants: [
      {
        type: ObjectId,
        ref: 'Developer',
      },
    ],
  },
  { timestamps: true },
);

export default JobPostSchema;
