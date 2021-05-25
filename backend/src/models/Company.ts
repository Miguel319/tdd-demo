import { Schema, Types, Document } from 'mongoose';
import { User } from './User';

const { ObjectId } = Types;

export interface Company extends Document {
  name?: string;
  img?: string;
  owner?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  fullAddress?: string;
  employeesCount?: number;
  netWorth?: number;
  jobPosts?: any;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User['_id'];
  _doc?: any;
}

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      reuired: [true, "The company's name is required."],
      unique: [
        true,
        "There's already a company registered with the same name.",
      ],
    },
    img: {
      type: String,
    },
    owner: {
      type: String,
      required: [true, "The company's owner is required."],
    },
    addressLine1: {
      type: String,
      required: [true, "The company's address is required."],
    },
    city: {
      type: String,
      required: [true, 'The city is required.'],
    },
    state: {
      type: String,
      required: [true, 'The state is required.'],
    },
    zipCode: {
      type: String,
      required: [true, 'The zip code is required.'],
    },
    fullAddress: {
      type: String,
    },
    netWorth: {
      type: Number,
      required: [true, "The company's net worth is mandatory."],
    },
    employeesCount: {
      type: Number,
      required: [true, 'The number of employees is required.'],
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    jobPosts: [
      {
        type: ObjectId,
        ref: 'JobPost',
      },
    ],
  },
  { timestamps: true },
);

CompanySchema.pre<Company>('save', function() {
  this.fullAddress = `${this.addressLine1}. ${this.city}, ${this.state}. ${this.zipCode}.`;
});

export default CompanySchema;
