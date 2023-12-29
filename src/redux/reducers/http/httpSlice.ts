import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@/redux/store";
import {AxiosRequestConfig} from 'axios';
import {apiClient} from "@/api";
import {HttpState, httpInitialState, createStateObject} from "./httpInitialState";

export interface HttpPayload {
    url: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    params?: any;
    body?: any;
    headers?: AxiosRequestConfig['headers'];
    useBearerToken?: boolean,
    extra?: {
        absolutePath?: boolean;
        dontResetDefault?: boolean;
    };
}

export interface HttpAction {
    correlationKey: keyof HttpState;
    response?: any;
    error?: any;
    payload: HttpPayload;
}

export const performHttpCall = createAsyncThunk(
    "http/sendRequest",
    async (payload: HttpAction, thunkAPI) => {
        const {payload: httpPayload} = payload;
        try {
            return await apiClient[httpPayload?.method]({
                url: httpPayload?.url,
                useBearerToken: httpPayload?.useBearerToken,
                params: httpPayload?.params,
                data: httpPayload?.body,
            });
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e);
        }
    }
);

export const httpSlice = createSlice({
    name: "http",
    initialState: httpInitialState,
    reducers: {
        resetHttpState(state, action: PayloadAction<{
            coreRelationKey: keyof HttpState,
            data: any,
        }>) {
            return {
                ...state,
                [action?.payload?.coreRelationKey]: {
                    ...createStateObject(action?.payload?.data),
                }
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(performHttpCall.pending, (state, {meta}) => {
            (state as any)[meta.arg.correlationKey] = {
                ...(state as any)[meta.arg.correlationKey],
                loading: true,
                error: null,
            };
        });
        builder.addCase(performHttpCall.rejected, (state, {meta, payload}) => {
            (state as any)[meta.arg.correlationKey] = {
                ...(state as any)[meta.arg.correlationKey],
                loading: false,
                success: false,
                data: null,
                error: (payload as any)?.response ?? payload,
            };
        });
        builder.addCase(performHttpCall.fulfilled, (state, {meta, payload}) => {
            (state as any)[meta.arg.correlationKey] = {
                ...(state as any)[meta.arg.correlationKey],
                loading: false,
                success: true,
                error: null,
                data: payload?.data,
            };
        });
    }
});

export const selectHttpState = (state: AppState) => state.http;
export const {resetHttpState} = httpSlice.actions;

export default httpSlice.reducer;
