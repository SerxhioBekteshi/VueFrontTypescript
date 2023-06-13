import JwtManager from "./jwtManager";
import axios from "axios";
import { IUserState, setUser } from "../store/stores/user.store";
// import eRoleType from "../assets/enums/eRoleType";
import { navigateTo } from "../store/stores/navigation.store";

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
  ): Promise<void> {
    const res = await axios.post("auth/login", credentials);
    console.log(res.data.data, "USERINFO");

    const data = res?.data.data;
    let response: any = null;
    console.log(res, "RES")
    if (data?.accessToken && data?.refreshToken) {
      const userInfo = AuthManager.parseJwt(data.accessToken);
      response = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
          email: userInfo.email,
          id: userInfo.Id,
          role: userInfo.role,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        },
      };
    }

    if (response.user && response.accessToken && response.refreshToken) {
      JwtManager.setAccessToken(response.accessToken);
      JwtManager.setRefreshToken(response.refreshToken);
      // dispatch(setUser(response.user));
      console.log(response.user, "USER RESPONSE");
      // if (response.user.role === eRoleType.Manager) {
      //   navigate(`/${response.user.role.toLowerCase()}/dashboard`);
      // } else {
      //   navigate(`/${response.user.role.toLowerCase().slice(0, -8)}`);
      // }
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