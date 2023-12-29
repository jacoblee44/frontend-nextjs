import { useAppDispatch, useAppSelector } from "@/hooks";
import { JobPostForm, selectFormState, updateJobPostForm } from "@/redux/reducers/fomSlice";

interface JobPostFormReturnProps {
  setPostTypeForm(keyOrObject: string | Object, value?: any): void,

  setBasicInfoForm(keyOrObject: string | Object, value?: any): void,

  setEmployeeJobDetailsForm(key: string, value: any): void,

  setCompensationForm(key: string, value: any): void,

  setJobDescriptionForm(key: string, value: any): void,

  setApplicationPreferenceForm(key: string, value: any): void,

  setQuestionsForm(key: string, value: any): void,

  setError(key: string, value: any): void,

  formState: {
    root: JobPostForm,
    postType: any,
    basicInfo: any,
    employeeJobDetails: any,
    compensation: any,
    jobDescription: any,
    applicationPreference: any,
    questions: any,
  },

  hasError: boolean,

  errors: {} | any,
}

export function useJobPostForm(): JobPostFormReturnProps {
  const dispatch = useAppDispatch();
  const jobPostState = useAppSelector(selectFormState).jobPost;

  const setPostTypeForm = (keyOrObject: string | Object, value: any = null) => {
    let extendedState = {};

    if (typeof keyOrObject === "string") {
      extendedState = {
        postType: {
          ...jobPostState.postType,
          [keyOrObject]: value,
        }
      };
    }

    if (typeof keyOrObject === "object") {
      extendedState = {
        postType: {
          ...jobPostState.postType,
          ...keyOrObject,
        }
      };
    }

    dispatch(updateJobPostForm(extendedState));
  };

  const setBasicInfoForm = (keyOrObject: string | Object, value: any = null) => {
    let extendedState = {};

    if (typeof keyOrObject === "string") {
      extendedState = {
        basicInfo: {
          ...jobPostState.basicInfo,
          [keyOrObject]: value,
        }
      };
    }

    if (typeof keyOrObject === "object") {
      extendedState = {
        basicInfo: {
          ...jobPostState.basicInfo,
          ...keyOrObject,
        }
      };
    }
    dispatch(updateJobPostForm(extendedState));
  };

  const setEmployeeJobDetailsForm = (key: string, value: any) => {
    dispatch(updateJobPostForm({
      employeeJobDetails: {
        ...jobPostState.employeeJobDetails,
        [key]: value,
      }
    }));
  };

  const setCompensationForm = (key: string, value: any) => {
    dispatch(updateJobPostForm({
      compensation: {
        ...jobPostState.compensation,
        [key]: value,
      }
    }));
  };

  const setJobDescriptionForm = (key: string, value: any) => {
    dispatch(updateJobPostForm({
      jobDescription: {
        ...jobPostState.jobDescription,
        [key]: value,
      }
    }));
  };

  const setApplicationPreferenceForm = (key: string, value: any) => {
    dispatch(updateJobPostForm({
      applicationPreference: {
        ...jobPostState.applicationPreference,
        [key]: value,
      }
    }));
  };

  const setQuestionsForm = (key: string, value: any) => {
    dispatch(updateJobPostForm({
      questions: {
        ...jobPostState.questions,
        [key]: value,
      }
    }));
  };

  const setError = (key: string, value: any) => {
    dispatch(updateJobPostForm({
      errors: {
        ...jobPostState.errors,
        [key]: value,
      }
    }));
  };

  const checkErrors = () => {
    let error = false;

    if (jobPostState?.errors) {
      Object.keys(jobPostState?.errors)?.forEach((key: any) => {
        if (jobPostState?.errors[key] && (jobPostState?.errors[key] === true || jobPostState?.errors[key] !== "")) {
          error = true;
        }
      });
    }

    return error;
  };

  const hasError = checkErrors();

  return {
    setPostTypeForm,
    setBasicInfoForm,
    setEmployeeJobDetailsForm,
    setCompensationForm,
    setJobDescriptionForm,
    setApplicationPreferenceForm,
    setQuestionsForm,
    setError,

    formState: {
      root: jobPostState,
      postType: jobPostState.postType,
      basicInfo: jobPostState.basicInfo,
      employeeJobDetails: jobPostState.employeeJobDetails,
      compensation: jobPostState.compensation,
      jobDescription: jobPostState.jobDescription,
      applicationPreference: jobPostState.applicationPreference,
      questions: jobPostState.questions,
    },

    hasError,
    errors: jobPostState?.errors,
  };
}