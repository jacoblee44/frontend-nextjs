import { combineReducers } from "redux";
import reduxServiceReducer from './reduxServiceSlice';
import httpReducer from './http/httpSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import formsReducer from './fomSlice';

/**
 * This is the root reducer which combines all the reducers
 * We include all the reducers here
 */
export const rootReducer = combineReducers({
  reduxService: reduxServiceReducer,
  http: httpReducer,
  auth: authReducer,
  ui: uiReducer,
  forms: formsReducer,
});
