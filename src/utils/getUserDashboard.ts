import { UserProfile } from "@/types/models";
import { routePaths } from "@/config";

export function getUserDashboard(userType: UserProfile['accounttype']): string {
  if (userType === "contractor") {
    return routePaths?.contractor?.dashboard;
  }

  return routePaths?.employer?.dashboard; // TODO:: we need to add the admin route condition here later
}