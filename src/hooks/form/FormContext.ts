import { ChangeEvent, createContext, FormEvent } from "react";
import { Errors, RegisterKeyOptions, SubmitAction, Values } from "./useForm";

export interface FormState {
  values: Values,
  errors: Errors,

  register(key: string, options?: RegisterKeyOptions): void,

  unregister(key: string): void,

  setValue(key: string, value: any): void,

  resetValue(): void,  //key: string

  setError(key: string, message: string | null): void,

  hasError(): boolean,

  clearErrors(): void,

  handleSubmit(submitAction: SubmitAction): (e: FormEvent<HTMLFormElement>) => void,

  bindInput(key: string): {
    value: any,
    onChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>): void,
  },
}

export const formState: FormState = {
  values: {},
  errors: {},
  register() {
  },
  unregister() {
  },
  setValue() {
  },
  resetValue() {
  },
  setError() {
  },
  hasError() {
    return false;
  },
  clearErrors() {
  },
  handleSubmit() {
    return (e) => {
      e.preventDefault();
    }
  },
  bindInput() {
    return {
      value: null,
      onChange() {

      }
    }
  }
};

export const FormContext = createContext(formState);