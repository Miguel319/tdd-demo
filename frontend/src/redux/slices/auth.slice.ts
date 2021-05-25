import {
  ActionReducerMapBuilder,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import AuthState from "../../interfaces/state/auth.state";
import { signIn, signUp, getCurrentUser } from "../actions/auth.action";
import RootState from "../../interfaces/state/root.state";
import { IUser } from "../../interfaces/models/IUser";

const authAdapter: EntityAdapter<AuthState> = createEntityAdapter();

const localCurrentUser = (): IUser | null => {
  try {
    const userStr = localStorage.getItem("currentUser");

    const user: IUser | null = userStr ? JSON.parse(userStr) : null;

    return user;
  } catch {
    return null;
  }
};

const initialState = authAdapter.getInitialState<AuthState>({
  status: "idle",
  currentUser: localCurrentUser(),
  error: undefined,
});

const signInReducer = (
  builder: ActionReducerMapBuilder<AuthState>
): ActionReducerMapBuilder<AuthState> => {
  return builder
    .addCase(signIn.pending, (state) => {
      state.status = "pending";
      state.error = undefined;
    })
    .addCase(signIn.fulfilled, (state, { payload }) => {
      if (typeof payload === "string") {
        state.error = payload;
        state.status = "failed";
      } else {
        state.currentUser = payload.user;
        state.status = "fulfilled";
      }
    })
    .addCase(signIn.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

const signUpReducer = (
  builder: ActionReducerMapBuilder<AuthState>
): ActionReducerMapBuilder<AuthState> => {
  return builder
    .addCase(signUp.pending, (state, action) => {
      state.status = "pending";
      state.error = undefined;
    })
    .addCase(signUp.fulfilled, (state, { payload }) => {
      if (typeof payload === "string") {
        state.error = payload;
        state.status = "failed";
      } else {
        state.currentUser = payload.user;
        state.status = "fulfilled";
      }
    })
    .addCase(signUp.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

const currentUserReducer = (
  builder: ActionReducerMapBuilder<AuthState>
): ActionReducerMapBuilder<AuthState> => {
  return builder.addCase(
    getCurrentUser.fulfilled,
    (state, { payload }): void => {
      state.currentUser = payload?.message ? null : payload;
    }
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>): void {
      state.currentUser = action.payload;
    },
    setAuthError(state, { payload }): void {
      state.error = payload;
    },
    logout(state = initialState): void {
      state.currentUser = null;

      const token = localStorage.getItem("token");
      const currentUser = localStorage.getItem("currentUser");

      if (token) localStorage.removeItem("token");
      if (currentUser) localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    signUpReducer(builder);
    signInReducer(builder);
    currentUserReducer(builder);
  },
});

export const { setAuthError, setUser, logout } = authSlice.actions;

export const selectAuthError = (state: RootState): string | undefined =>
  state.auth.error;

export const selectCurrentUser = (state: RootState): IUser | null =>
  state.auth.currentUser;

export default authSlice.reducer;
