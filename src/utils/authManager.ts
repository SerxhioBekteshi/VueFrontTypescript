import JwtManager from "./jwtManager";
import axios from "axios";
import { IUserState, setUser } from "../store/stores/user.store";
// import eRoleType from "../assets/enums/eRoleType";
import { navigateTo } from "../store/stores/navigation.store";
import { useRouter } from "vue-router";
import eRoleType from "@/assets/eRoleType";

export interface IUserInfo {
  user: any;
  accessToken: string;
  refreshToken: string;
}
class AuthManager {
  static get token(): string | null {
    return JwtManager.accessToken;
  }

  private static parseJwt(token: string) {
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

      return {
        email: userInfo.email,
        id: userInfo.Id,
        role: userInfo.role,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      };
    }
    return null;
  }

  static async login(
    credentials: any,
    // dispatch: any,
    // navigate: any
    router: any
  ): Promise<void> {
    const res = await axios.post("user/login", credentials);
    const data = res?.data;
    let response: any = null;
    if (data?.access_token || data?.refreshToken) {
      const userInfo = AuthManager.parseJwt(data.access_token);
      response = {
        accessToken: data.access_token,
        // refreshToken: data.refreshToken,
        user: userInfo.user,
      };
    }
    if ((response.user && response.accessToken) || response.refreshToken) {
      JwtManager.setAccessToken(response.accessToken);
      // JwtManager.setRefreshToken(response.refreshToken);
      // dispatch(setUser(response.user));

      if (response.user.roleId === eRoleType.Admin) {
        router.push("/admin/dashboard");
      } else if (response.user.roleId === eRoleType.Provider) {
        router.push("/provider/dashboard");
      } else {
        router.push("/");
      }
    }
  }

  static async register(user: any): Promise<any> {
    const { data } = await axios.post("/auth/client/signup", user);
    if (data?.result) {
      //ka qene access token
      return data.jtwToken;
    }
    return null;
  }

  // static async refreshToken(
  //   accessToken: string,
  //   refreshToken: string
  // ): Promise<IUserInfo> {
  //   const { data } = await axios.post("authentication/refresh", {
  //     accessToken,
  //     refreshToken,
  //   });
  //   let responseLogin: IUserInfo = null;
  //   if (data?.accessToken && data?.refreshToken) {
  //     const userInfo = AuthManager.parseJwt(data.accessToken);
  //     responseLogin = {
  //       accessToken: data.accessToken,
  //       refreshToken: data.refreshToken,
  //       user: {
  //         email: userInfo.Email,
  //         id: userInfo.Id,
  //         role: userInfo.role,
  //         firstName: userInfo.FirstName,
  //         lastName: userInfo.LastName,
  //       },
  //     };
  //     JwtManager.setAccessToken(data.accessToken);
  //     JwtManager.setRefreshToken(data.refreshToken);
  //   }
  //   return responseLogin;
  // }

  static logout(dispatch: any) {
    JwtManager.clearToken();
    dispatch(navigateTo("/"));
    dispatch(setUser(null));
  }
}

export default AuthManager;
