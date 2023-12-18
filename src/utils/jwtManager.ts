import AppStorageManager from "./appStorageManager";
// import AuthManager from "./authManager";
// import jwtDecode, { JwtPayload } from "jwt-decode";

class JwtManager {
  private static access_token = "access_token";
  private static refresh_token = "refresh_token";
  public static get accessToken(): string | null {
    return AppStorageManager.getItem(JwtManager.access_token);
  }
  public static get refreshToken(): string | null {
    return AppStorageManager.getItem(JwtManager.refresh_token);
  }

  static setAccessToken(t: string | null): void {
    if (t) {
      AppStorageManager.setItem(JwtManager.access_token, t);
    } else {
      AppStorageManager.removeItem(JwtManager.access_token);
    }
  }

  // static async getValidToken(): Promise<string | null> {
  //   const { accessToken: token, refreshToken } = JwtManager;
  //   try {
  //     const decoded = jwtDecode<JwtPayload>(token);
  //     if (decoded) {
  //       const curretDate = new Date().getTime();
  //       const timeExp = decoded.exp * 1000;
  //       if (curretDate < timeExp) {
  //         return token;
  //       }
  //       const res = await AuthManager.refreshToken(
  //         token ?? "",
  //         refreshToken ?? ""
  //       );
  //       if (res && res.accessToken) {
  //         return res.accessToken;
  //       }
  //     }
  //   } catch (e) {
  //     console.log("JwtManager.getValidToken", e);
  //   }
  //   return null;
  // }

  static setRefreshToken(t: string | null): void {
    if (t) {
      AppStorageManager.setItem(JwtManager.refresh_token, t);
    } else {
      AppStorageManager.removeItem(JwtManager.refresh_token);
    }
  }

  static clearToken() {
    AppStorageManager.removeItem(JwtManager.access_token);
    AppStorageManager.removeItem(JwtManager.refresh_token);
  }
}

export default JwtManager;
