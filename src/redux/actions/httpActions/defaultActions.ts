import { store } from "@/redux/store";
import { HttpState } from "@/redux/reducers/http";
import { clearHttpState } from "@/redux/reducers/http/httpCallSets";

export function clearHttpStateObject(coreRelationKey: keyof HttpState, data: any = null) {
  store.dispatch(clearHttpState(coreRelationKey, data));
}