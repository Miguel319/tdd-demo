import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import jobPostReducer from "../slices/job-post.slice";
import authReducer from "../slices/auth.slice";
import companyReducer from "../slices/company.slice";

const store = configureStore({
  reducer: {
    jobPosts: jobPostReducer,
    auth: authReducer,
    companies: companyReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
