import { store } from "@/redux/store";
import { confirmDialog, UiInitialState, UiState } from "@/redux/reducers/uiSlice";

export function openConfirmationDialog(options: Partial<Omit<UiState['confirmationDialog'], 'open'>>) {
  store.dispatch(confirmDialog({
    open: true,
    ...options,
  }));
}

export function closeConfirmationDialog() {
  store.dispatch(confirmDialog(UiInitialState.confirmationDialog));
}