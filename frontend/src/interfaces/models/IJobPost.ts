import { ICompany } from "./ICompany";
import { IDeveloper } from "./IDeveloper";
export type ShiftType = "Full-Time" | "Part-Time";

export interface IJobPost {
  _id: string;
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
    _id?: ICompany["_id"];
    name?: string;
    img?: string;
  };
  applicants?: Array<IDeveloper["_id"]>;
  createdAt?: Date;
  updatedAt?: Date;
}
