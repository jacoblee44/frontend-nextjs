import {useAppSelector} from "@/hooks";
import {selectAuthState} from "@/redux/reducers/authSlice";

export function useAuthInfo() {
    return useAppSelector(selectAuthState);
}