import { AppState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReduxServiceState {
  isReady: boolean,
}

const initialState: ReduxServiceState = {
  isReady: false,
};

export const reduxServiceSlice = createSlice({
  name: "reduxService",
  initialState,
  reducers: {
    updateReduxServiceProps: (state, action: PayloadAction<Partial<ReduxServiceState>>) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});

export const selectReduxService = (state: AppState) => state.reduxService;
export const { updateReduxServiceProps } = reduxServiceSlice.actions;

export default reduxServiceSlice.reducer;
