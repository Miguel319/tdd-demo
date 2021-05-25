import { Company } from './Company';
import { Developer } from './Developer';
import { Schema, Types, Document } from 'mongoose';

const { ObjectId } = Types;

export enum Role {
  COMPANY = 'Company',
  DEVELOPER = 'Developer',
}

export interface User extends Document {
  name: string;
  email?: string;
  password?: string;
  role?: Role;
  associatedEntity?: Company['_id'] | Developer['_id'];
  getSignedJwtToken?: () => string;
  matchPassword?: (enteredPassword: string) => Promise<boolean>;
  getResetPasswordToken?: () => Promise<string>;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name field is required.'],
    },
    email: {
      type: String,
      unique: [true, 'The email provided has already been taken.'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'The provided email is invalid.'],
      required: [true, 'The email is required.'],
    },
    password: {
      type: String,
      required: [true, 'The password is required.'],
      minlength: [6, 'The password must have at least 6 characters.'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'The role must be provided.'],
      enum: ['Company', 'Developer'],
    },
    associatedEntity: {
      type: ObjectId,
      refPath: 'role',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  },
);

// UserSchema.plugin(uniqueValidator);

export default UserSchema;
