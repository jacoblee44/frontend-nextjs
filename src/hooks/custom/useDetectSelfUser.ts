import {useAuthInfo} from "@/hooks/custom/useAuthInfo";

export function useDetectSelfUser(userId: number | string): boolean {
    const { userData } = useAuthInfo();
    const authUserId = Number(userData?._id);

    return Number(userId) === authUserId;
};