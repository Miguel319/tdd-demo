export type IRole = "Company" | "Developer";

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  associatedEntity?: string;
  role?: IRole;
}
