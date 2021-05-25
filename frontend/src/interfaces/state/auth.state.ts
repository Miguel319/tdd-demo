import { Status } from "./base-req.state";
import { IUser } from "../models/IUser";

export default interface AuthState {
  currentUser: null | IUser;
  status: Status;
  error: undefined | string;
}
