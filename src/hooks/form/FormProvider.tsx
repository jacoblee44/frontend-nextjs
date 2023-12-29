import { FormContext, FormState } from "./FormContext";
import React from "react";

interface FormProviderProps {
  methods: FormState,
  children?: React.ReactNode,
}

export const FormProvider: React.FC<FormProviderProps> = ({ methods, children }) => {
  return (
    <FormContext.Provider value={methods}>
      {children}
    </FormContext.Provider>
  );
};