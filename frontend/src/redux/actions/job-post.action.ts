import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import { ValidationErrors } from "../../interfaces/state/validation.error";

export const fetchJobPosts = createAsyncThunk(
  "GET_JOB_POSTS",
  async (): Promise<any> => {
    try {
      const { data } = await axios.get(`${API_URL}/job-posts`);

      return data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) throw err;

      return error.response.data.message;
    }
  }
);

export const fetchJobPostByID = createAsyncThunk(
  "GET_JOB_POST_BY_ID",
  async (_id: string): Promise<any> => {
    try {
      const { data } = await axios.get(`${API_URL}/job-posts/${_id}`);

      return data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) throw err;

      return error.response.data.message;
    }
  }
);
