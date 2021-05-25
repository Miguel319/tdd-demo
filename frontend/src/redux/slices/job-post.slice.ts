import JobPostState from "../../interfaces/state/job-post.state";
import { fetchJobPosts, fetchJobPostByID } from "../actions/job-post.action";
import RootState from "../../interfaces/state/root.state";
import { IJobPost } from "../../interfaces/models/IJobPost";
import { Status } from "../../interfaces/state/base-req.state";

import {
  ActionReducerMapBuilder,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
} from "@reduxjs/toolkit";

const jobPostAdapter: EntityAdapter<JobPostState> = createEntityAdapter();

const initialState = jobPostAdapter.getInitialState<JobPostState>({
  jobPosts: {
    data: [],
    status: "idle",
  },
  jobPost: {
    data: null,
    status: "idle",
  },
  error: undefined,
});

const fetchAllPostsReducer = (
  builder: ActionReducerMapBuilder<JobPostState>
): ActionReducerMapBuilder<JobPostState> => {
  return builder
    .addCase(fetchJobPosts.pending, (state, _) => {
      if (state.jobPosts.data.length === 0) state.jobPosts.status = "pending";

      state.error = undefined;
    })
    .addCase(fetchJobPosts.fulfilled, (state, action) => {
      state.jobPosts.status = "idle";
      state.jobPosts.data = action.payload;
    })
    .addCase(fetchJobPosts.rejected, (state, action) => {
      state.jobPosts.status = "failed";
      state.error = action.error.message;
    });
};

const fetchSinglePostReducer = (
  builder: ActionReducerMapBuilder<JobPostState>
): ActionReducerMapBuilder<JobPostState> => {
  return builder
    .addCase(fetchJobPostByID.pending, (state, _) => {
      state.jobPost.status = "pending";
      state.error = undefined;
    })
    .addCase(fetchJobPostByID.fulfilled, (state, action) => {
      state.jobPost.status = "idle";
      state.jobPost.data = action.payload;
    })
    .addCase(fetchJobPostByID.rejected, (state, action) => {
      state.jobPosts.status = "failed";
      state.error = action.error.message;
    });
};

const jobPostSlice = createSlice({
  name: "jobPosts",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<JobPostState>) => {
    fetchAllPostsReducer(builder);
    fetchSinglePostReducer(builder);
  },
});

export const selectAllJobPosts = (state: RootState): Array<IJobPost> =>
  state.jobPosts.jobPosts.data;

export const selectAllJobPostsStatus = (state: RootState): Status =>
  state.jobPosts.jobPosts.status;

export const selectSingleJobPost = (state: RootState): IJobPost | null =>
  state.jobPosts.jobPost.data;

export const selectSingleJobPostStatus = (state: RootState): Status =>
  state.jobPosts.jobPost.status;

export const selectError = (state: RootState): string | undefined =>
  state.jobPosts.error;

export default jobPostSlice.reducer;
