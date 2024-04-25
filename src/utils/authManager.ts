import JwtManager from "./jwtManager";
import axios from "axios";
// import { setUser } from "../store/stores/user.store";

import { eRoles } from "@/assets/enums/eRoles";
// import { useDispatch } from "@/store/redux/helpers";
import { Store } from "vuex";
import { eMutationTypes } from "@/assets/enums/eMutationTypes";

export interface IUserInfo {
  user?: any;
  accessToken: string;
  refreshToken: string;
}
class AuthManager {
  static get token(): string | null {
    return JwtManager.accessToken;
  }

  static parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  static async getUserFromToken(): Promise<any> {
    if (JwtManager.accessToken) {
      const userInfo = AuthManager.parseJwt(JwtManager.accessToken);
      return this.handleUserDataBasedOnRole(userInfo);
    }
    return null;
  }

  static async getUserData(): Promise<any> {
    try {
      const res: any = await axios.get("/user/loggedUser");
      if (res && res.data) {
        return this.handleUserDataBasedOnRole(res.data);
      } else return null;
    } catch (err) {
      console.log(err, "ERR IN GETTING LOGGEDF USER DATA");
    }
  }

  static loginWithToken(
    user: any,
    accessToken: string,
    refreshToken?: string,
    router?: any,
    store?: any
  ) {
    if (user) {
      JwtManager.setAccessToken(accessToken);
      JwtManager.setRefreshToken(refreshToken);
      store.commit(
        eMutationTypes.SET_USER,
        this.handleUserDataBasedOnRole(user)
      );

      router.push("/quiz");
    }
  }

  static handleAfterLoginAfterMath(
    userResponse: any,
    store: Store<any>,
    router?: any
  ) {
    if (
      (userResponse?.user && userResponse?.accessToken) ||
      userResponse?.refreshToken
    ) {
      JwtManager.setAccessToken(userResponse.accessToken);
      JwtManager.setRefreshToken(userResponse.refreshToken);

      store.commit(
        eMutationTypes.SET_USER,
        this.handleUserDataBasedOnRole(userResponse?.user)
      );

      if (
        userResponse.user.role === eRoles.User &&
        !userResponse.user.quizFulfilled
      )
        router.push("/quiz");
      else router.push("/dashboard");
    }
  }

  static async login(credentials: any): Promise<void> {
    const res = await axios.post("user/login", credentials);
    const data = res?.data;

    let response: any = null;
    if (data?.access_token || data?.refresh_token) {
      const userInfo = AuthManager.parseJwt(data.access_token);
      response = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: userInfo?.user,
      };
      return response;
    }
  }

  static async googleLogin(payload: any, router: any) {
    const res = await axios.post("authentication/googlelogin", payload);
    const { user, access_token, refresh_token } = res?.data;
    if (!access_token) return;
    this.loginWithToken(user, access_token, refresh_token, router);
  }

  static async register(user: any, role?: eRoles): Promise<any> {
    const res = await axios.post(
      `/user/register${role === eRoles.Provider ? "Provider" : ""}`,
      user
    );

    if (res && res?.data) {
      return res.data;
    }
    return null;
  }

  static async refreshToken(
    accessToken: string,
    refreshToken: string
  ): Promise<any> {
    const { data } = await axios.post("authentication/refresh", {
      accessToken,
      refreshToken,
    });
    let responseLogin: any = null;
    if (data?.accessToken && data?.refreshToken) {
      const userInfo = AuthManager.parseJwt(data.accessToken);
      responseLogin = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
          email: userInfo.email,
          id: userInfo.id,
          role: userInfo.role,
          name: userInfo.name,
          lastName: userInfo.lastName,
          image: userInfo.image,
          state: userInfo.state,
          address: userInfo.address,
        },
      };
      JwtManager.setAccessToken(data.accessToken);
      JwtManager.setRefreshToken(data.refreshToken);
    }
    return responseLogin;
  }

  static logout(store: any) {
    JwtManager.clearToken();
    store.commit(eMutationTypes.CLEAR_USER);
  }

  public static handleUserDataBasedOnRole = (user: any): any => {
    const baseLoggedData = {
      email: user.email,
      id: user.id,
      role: user.role,
      name: user.name,
      lastName: user.lastName,
      image: user.image,
      state: user.state,
      address: user.address,
      accessPermissions: user.accessPermissions,
      phoneNumber: user.phoneNumber,
    };

    if (user.role === eRoles.Provider) {
      return {
        ...baseLoggedData,
        termsAgreed: user.termsAgreed,
        nipt: user.nipt,
        orders: user?.orders,
        websites: user?.websites,
        accountSubmitted: user.accountSubmitted,
      };
    }
    if (user.role === eRoles.User) {
      return {
        ...baseLoggedData,
        gender: user.gender,
        birthDate: user.birthDate,
        accountSubmitted: user.accountSubmitted,
        quizFulfilled: user.quizFulfilled,
        quizResults: user.quizResults,
        orders: user?.orders,
      };
    }
    return baseLoggedData;
  };
}

export default AuthManager;
