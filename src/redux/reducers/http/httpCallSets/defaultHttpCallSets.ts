import { resetHttpState } from "../httpSlice";
import { HttpState } from "../httpInitialState";

export const clearHttpState = (coreRelationKey: keyof HttpState, data: any = null) => resetHttpState({
  coreRelationKey,
  data,
});