import JwtManager from "./jwtManager";
import axios from "axios";
import { setUser } from "../store/stores/user.store";
// import { navigateTo } from "../store/stores/navigation.store";
// import eRoleType from "@/assets/enums/eRoleType";
import { eRoles } from "@/assets/enums/eRoles";
import { useDispatch } from "@/store/redux/helpers";
import { useAbility } from "@casl/vue";
import { defineAbilityFor } from "@/initializers/ability";
import { Store, useStore } from "vuex";
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
    router?: any
    // dispatch?: any
  ) {
    if (user) {
      JwtManager.setAccessToken(accessToken);
      // JwtManager.setRefreshToken(refreshToken);

      user && useDispatch()(setUser(user));

      // if (user.firstLogin) {
      //   user && dispatch && dispatch(navigateTo(`/${user.role}/changePassword`));
      // }

      // if (user.shouldVerify) {
      //   user && useDispatch()(navigateTo("/confirm"));
      // }

      user && useDispatch()(router.push(`/${user.role.toLowerCase()}/quiz`));
    }
  }

  static async login(
    credentials: any,
    // dispatch: any,
    // navigate: any
    router: any,
    store: Store<any>
  ): Promise<void> {
    const res = await axios.post("user/login", credentials);
    const data = res?.data;
    // const dispatch = useDispatch();

    let response: any = null;
    if (data?.access_token || data?.refresh_token) {
      const userInfo = AuthManager.parseJwt(data.access_token);
      response = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: userInfo?.user,
      };
    }
    if ((response?.user && response?.accessToken) || response?.refreshToken) {
      JwtManager.setAccessToken(response.accessToken);
      JwtManager.setRefreshToken(response.refreshToken);

      // useDispatch()(setUser(response?.user));
      // dispatch(setUser(response?.user));
      // store.dispatch("user/setUser", response?.user);
      store.commit(
        eMutationTypes.SET_USER,
        this.handleUserDataBasedOnRole(response?.user)
      );

      router.push("/dashboard");
      // if (response.user.roleId === eRoleType.Admin) {
      //   router.push("/admin");
      // } else if (response.user.roleId === eRoleType.Provider) {
      //   router.push("/provider");
      // } else {
      //   if (!response.user.quizFulfilled) router.push("/user/quiz");
      //   else router.push("/user");
      // }
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

  static logout(dispatch: any) {
    JwtManager.clearToken();
    useDispatch()(setUser(null));
    // dispatch(setUser(null));
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
    };

    if (user.role === eRoles.Provider) {
      return {
        ...baseLoggedData,
        termsAgreed: user.termsAgreed,
        nipt: user.nipt,
      };
    } else if (user.role === eRoles.User) {
      return {
        ...baseLoggedData,
        gender: user.gender,
        birthDate: user.birthDate,
        accountSubmitted: user.accountSubmitted,
        quizFulfilled: user.quizFulfilled,
      };
    }

    return baseLoggedData;
  };
}

export default AuthManager;
