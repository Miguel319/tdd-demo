import { IUser } from "./IUser";

export interface ICompany extends Document {
  _id: string;
  name?: string;
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
  user?: IUser["_id"];
  _doc?: any;
}
