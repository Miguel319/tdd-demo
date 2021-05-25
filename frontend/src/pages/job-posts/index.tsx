import { useSelector } from "react-redux";
import {
  selectAllJobPosts,
  selectAllJobPostsStatus,
} from "../../redux/slices/job-post.slice";
import { IJobPost } from "../../interfaces/models/IJobPost";
import { Status } from "../../interfaces/state/base-req.state";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store/index";
import { fetchJobPosts } from "../../redux/actions/job-post.action";
import Post from "../../components/Post/Post";
import Loading from "../../components/Loading/Loading";

const JobPosts = () => {
  const jobPosts: Array<IJobPost> = useSelector(selectAllJobPosts);
  const status: Status = useSelector(selectAllJobPostsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchJobPosts());
  }, [dispatch]);

  const displayAllPosts = () =>
    jobPosts?.length && status !== "pending" ? (
      <>
        {jobPosts.map((jobPost) => {
          return <Post post={jobPost} key={jobPost._id} />;
        })}
      </>
    ) : null;

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-extrabold">Recent Job Posts</h1>
      {status === "pending" ? <Loading /> : displayAllPosts()}
    </div>
  );
};

export default JobPosts;
