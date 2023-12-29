import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/redux/store";

export interface JobPostForm {
  postType: {} | any,
  basicInfo: {} | any,
  employeeJobDetails: {} | any,
  compensation: {} | any,
  jobDescription: {} | any,
  applicationPreference: {} | any,
  questions: {} | any,

  errors: {} | any,
}

export interface FormState {
  jobPost: JobPostForm,
}

const initialState: FormState = {
  jobPost: {
    postType: {},
    basicInfo: {},
    employeeJobDetails: {},
    compensation: {},
    jobDescription: {},
    applicationPreference: {},
    questions: {},

    errors: {

    },
  }
};

export const fomSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateJobPostForm: (state, action: PayloadAction<Partial<FormState['jobPost']>>) => {
      return {
        ...state,
        jobPost: {
          ...state.jobPost,
          ...action?.payload,
        },
      };
    },
  },
});

export const selectFormState = (state: AppState) => state.forms;
export const { updateJobPostForm } = fomSlice.actions;

export default fomSlice.reducer;
export { initialState as formInitialState };