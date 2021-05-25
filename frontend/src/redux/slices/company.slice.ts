import {
  ActionReducerMapBuilder,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
} from "@reduxjs/toolkit";
import AuthState from "../../interfaces/state/auth.state";
import CompanyState from "../../interfaces/state/company.state";
import { registerCompany } from "../actions/company.actions";
import RootState from "../../interfaces/state/root.state";

const companyAdapter: EntityAdapter<AuthState> = createEntityAdapter();

const initialState = companyAdapter.getInitialState<CompanyState>({
  companies: {
    data: [],
    status: "idle",
  },
  company: {
    data: null,
    status: "idle",
  },
  status: "idle",
  error: undefined,
});

const registerCompanyReducer = (
  builder: ActionReducerMapBuilder<CompanyState>
) => {
  return builder
    .addCase(registerCompany.pending, (state) => {
      state.status = "pending";
      state.error = undefined;
    })
    .addCase(registerCompany.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";

      if (typeof payload === "string") state.error = payload;
    })
    .addCase(registerCompany.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CompanyState>) => {
    registerCompanyReducer(builder);
  },
});

export const selectListOfCompanies = (state: RootState) =>
  state.companies.companies.data;

export const selectSingleCompany = (state: RootState) =>
  state.companies.company.data;

export const selectCompanyError = (state: RootState) => state.companies.error;

export default companySlice.reducer;
