import { ChangeEvent, FormEvent, useState } from "react";

interface UseFormProps {
  defaultValues?: Values,
}

export interface Values {
  [key: string]: any,
}

export interface RegisterKeyOptions {
  required?: string | false,

  validate?(value: any, values: Values): string | true,
}

export interface Errors {
  [key: string]: string | null,
}

export type SubmitAction = (values: {
  [key: string]: any,
}) => void;

export function useForm(props?: UseFormProps) {
  const [values, setValues] = useState({
    ...props?.defaultValues,
  });

  const [registeredStates, setRegisteredStates] = useState<{
    [key: string]: RegisterKeyOptions,
  }>({});
  const [errors, setErrors] = useState<Errors>({});

  const setError = (key: string, message: string | null) => {
    setErrors(prevState => ({
      ...prevState,
      [key]: message,
    }));
  };

  const setValue = (key: string, value: string) => {
    setValues(prevState => ({
      ...prevState,
      [key]: value,
    }));

    checkError(key, value);
  };

  const resetValue = () => {  //key:string
    
    setValues(() => ({}));
    //const { [key]: _, ...rest } = values;
   // setValues(rest);
  };

  const checkError = (key: string, value: any) => {
    let __error = false;

    if (registeredStates[key]) {
      const validate = registeredStates[key]?.validate;
      const required = registeredStates[key]?.required;

      if (required) {
        const message = !value || value?.toString()?.trim() === "" ? (
          typeof required === "string" ? required : "This field is required!"
        ) : null;
        setError(key, message);
        __error = message !== null;

        if (__error) {
          return __error;
        }
      }

      if (validate && typeof validate === "function") {
        const validated = validate(value, values);
        const message = typeof validated === "string" ? validated : null;
        setError(key, message);
        __error = message !== null;
      }
    }

    return __error;
  };

  const register = (key: string, options: RegisterKeyOptions) => {
    setRegisteredStates(prevState => ({
      ...prevState,
      [key]: {
        required: options?.required,
        validate: options?.validate,
      },
    }));
  };

  const unregister = (key:string) => { 
    setValue(key, "");
    const { [key]: _, ...rest } = values;
    setRegisteredStates(rest);
  };

  const hasError = () => {
    let __error = false;

    Object.keys(registeredStates).forEach((key) => {
      if (checkError(key, values[key])) {
        __error = true;
      }
    });

    return __error;
  };

  const clearErrors = () => {
    setErrors(() => ({}));
  };

  const handleSubmit = (submitAction: SubmitAction) => {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (hasError()) {
        return;
      }

      if (typeof submitAction === "function") {
        submitAction(values);
      }
    };
  };

  const bindInput = (key: string) => ({
    value: values[key] ?? null,
    onChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) {
      setValue(key, e?.target?.value ?? null);
    },
  });

  return {
    values,
    errors,
    register,
    unregister,
    setValue,
    resetValue,
    setError,
    hasError,
    clearErrors,
    handleSubmit,
    bindInput,
  };
}