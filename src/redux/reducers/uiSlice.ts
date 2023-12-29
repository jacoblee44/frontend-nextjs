import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/redux/store";
export interface UiState {
    confirmationDialog: {
        open: boolean,
        type: "error" | "info" | "success",
        cancelType: "error" | "info",
        textCenter: "center" | "left",
        title: string,
        message: string,
        hasCancel: boolean,
        cancelLabel: string,
        confirmLabel: string,
        onClickCancel?: any,
        onClickConfirm: any,
    },
}

const initialState: UiState = {
    confirmationDialog: {
        open: false,
        type: "info",
        cancelType: "info",
        textCenter: "left",
        title: '',
        message: '',
        hasCancel: true,
        cancelLabel: '',
        confirmLabel: '',
        onClickCancel: undefined,
        onClickConfirm: undefined,
    },
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        confirmDialog: (state, action: PayloadAction<Partial<UiState['confirmationDialog']>>) => {
            return {
                ...state,
                confirmationDialog: {
                    ...state.confirmationDialog,
                    ...action?.payload,
                }
            };
        },
    },
});

export const selectUiState = (state: AppState) => state.ui;
export const { confirmDialog } = uiSlice.actions;
export { initialState as UiInitialState };
export default uiSlice.reducer;
