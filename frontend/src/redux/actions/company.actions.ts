import { AxiosError } from "axios";
import { API_URL } from "./../../utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICompany } from "../../interfaces/models/ICompany";
import axios from "axios";
import { ValidationErrors } from "../../interfaces/state/validation.error";
import { headers } from "../../utils/constants";

export const registerCompany = createAsyncThunk(
  "REGISTER_COMPANY",
  async (company: ICompany): Promise<any> => {
    try {
      const { data } = await axios.post(`${API_URL}/companies`, company, {
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
