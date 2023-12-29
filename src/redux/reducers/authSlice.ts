import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/redux/store";
import { UserProfile } from "@/types/models";

export interface AuthState {
  loggedIn?: boolean,
  loginRedirectRef?: string | null,
  token?: string | null,
  userData?: UserProfile | null,
  shouldReloadUserData?: boolean,
}

const initialState: AuthState = {
  loggedIn: false,
  loginRedirectRef: null,
  token: null,
  userData: null,
  shouldReloadUserData: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
    clearAuth: () => {
      return {
        ...initialState,
      };
    },

    shouldReloadUserData: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        shouldReloadUserData: action?.payload,
      };
    },
  },
});

export const selectAuthState = (state: AppState) => state.auth;
export const { storeAuth, clearAuth, shouldReloadUserData } = authSlice.actions;

export default authSlice.reducer;
export { initialState as authInitialState };