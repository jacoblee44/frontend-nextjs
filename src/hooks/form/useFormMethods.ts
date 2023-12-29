import { useContext } from "react";
import { FormContext } from "./FormContext";

export const useFormMethods = () => {
  return useContext(FormContext);
};