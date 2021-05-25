import { Status } from "./base-req.state";
import { IJobPost } from "../models/IJobPost";

export default interface JobPostState {
  jobPosts: {
    data: Array<IJobPost>;
    status: Status;
  };
  jobPost: {
    data: IJobPost | null;
    status: Status;
  };
  error: undefined | string;
}
