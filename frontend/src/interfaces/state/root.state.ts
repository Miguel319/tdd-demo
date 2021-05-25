import JobPostState from "./job-post.state";
import AuthState from './auth.state';
import CompanyState from './company.state';

export default interface RootState {
  jobPosts: JobPostState;
  companies: CompanyState;
  auth: AuthState;
}
