import { UserProfile } from "@/types/models";
import { apiClient, endpoints } from "@/api";

type Callback = (() => void) | undefined;

export class AuthService {
  public __tokenKey: string = '__auth_token'; // User secret key
  public __userDataKey: string = '__auth_user_data'; // User data secret key

  public getToken(): string | null {
    let token: string | null = window.localStorage.getItem(this.__tokenKey);
    return token && token !== '' ? token : null;
  }

  public getUserData(): UserProfile | null {
    let userData: string | null = window.localStorage.getItem(this.__userDataKey);
    return userData && userData !== '' ? JSON.parse(userData) : null;
  }

  public setToken(token: string, callback: Callback = undefined): void {
    window.localStorage.setItem(this.__tokenKey, token);

    if (callback && typeof callback === "function") {
      callback();
    }
  }

  public setUserData(userData: any, callback: Callback = undefined): void {
    window.localStorage.setItem(this.__userDataKey, JSON.stringify(userData));

    if (callback && typeof callback === "function") {
      callback();
    }
  }

  public removeToken(callback: Callback = undefined): void {
    window.localStorage.removeItem(this.__tokenKey);

    if (callback && typeof callback === "function") {
      callback();
    }
  }

  public removeUserData(callback: Callback = undefined): void {
    window.localStorage.removeItem(this.__userDataKey);

    if (callback && typeof callback === "function") {
      callback();
    }
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public isLoggedOut(): boolean {
    return this.getToken() === null;
  }

  public getAuthUser(userId: UserProfile['_id'], callback: ((userData: UserProfile) => void) | undefined = undefined): void {
    const self = this;
    console.log("USER ID", userId);

    apiClient.post({
      url: endpoints.private.getUser,
      data: {
        userid: userId,
      }
    }).then(({ data }) => {
      if (data && data?.status && data?.user) {
        self.setUserData(data?.user);
        if (callback) {
          callback(data?.user);
        }
      }
    }).catch(() => {
      alert("Failed to get user data!");
    });
  }
}
