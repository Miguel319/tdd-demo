import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, headers } from "../../utils/constants";
import { ValidationErrors } from "../../interfaces/state/validation.error";
import { IUser } from "../../interfaces/models/IUser";

export const signIn = createAsyncThunk(
  "SIGN_IN",
  async (user: IUser): Promise<any> => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/sign-in`, user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      return data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) throw err;

      return error.response.data.message;
    }
  }
);

export const signUp = createAsyncThunk(
  "SIGN_UP",
  async (user: IUser): Promise<any> => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/sign-up`, user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      return data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) throw err;

      return error.response.data.message;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "CURRENT_USER",
  async (): Promise<any> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return null;

      const { data } = await axios.get(`${API_URL}/auth/current-user`, {
        withCredentials: true,
        headers: headers(),
      });

      return data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) throw err;

      return error.response.data.message;
    }
  }
);
