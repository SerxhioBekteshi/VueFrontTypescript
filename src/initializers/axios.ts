import axios, { AxiosRequestConfig } from "axios";
import JwtManager from "../utils/jwtManager";
import eNotificationType from "../assets/enums/eNotificationType";
// import { navigateTo } from "../store/stores/navigation/navigation.store";
import AuthManager from "../utils/authManager";
import eHttpResponse from "@/assets/enums/eHttpResponse";

interface IAxiosRequestConfigRetry extends AxiosRequestConfig {
  _retry: boolean;
  _noAuth: boolean;
}

const clearSession = () => {
  JwtManager.clearToken();
  const urlRedirect = "/login";
  window.location.href = urlRedirect;
};

const handleResponseMessage = (
  response: any,
  notificationType: any,
  useToast: any
) => {
  console.log(response, "awdawdawd");
  const $toast = useToast();
  if (response === "jwt expired") {
    clearSession();
    return;
  }
  switch (notificationType) {
    case eNotificationType.Success:
      $toast.open({
        message: response.message,
        type: "success",
        position: "top-right",
        duration: 3000,
      });

      break;
    case eNotificationType.Error:
      $toast.open({
        message: response?.data?.message,
        type: "error",
        position: "top-right",
        duration: 3000,
      });

      break;
    default:
      Error("handleResponseMessage: Notification Type not handled");
  }
};

const axiosInit = async (useToast: any) => {
  axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}`;
  axios.interceptors.request.use((request: any) => {
    const jwt = JwtManager.accessToken;
    if (jwt) {
      request.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return request;
  });

  //undefined ka qene null
  axios.interceptors.response.use(null, async (error) => {
    const originalRequest: IAxiosRequestConfigRetry = error.config;
    if (originalRequest._noAuth) {
      throw error.response;
    }
    console.log(error.response, "awdawd");
    if (error.response) {
      // if (
      //   error.response.status === eHttpResponse.Unauthorized &&
      //   !originalRequest._retry
      // ) {
      //   originalRequest._retry = true;
      //   try {
      // const res = await AuthManager.refreshToken(
      //   JwtManager.accessToken,
      //   JwtManager.refreshToken
      // );
      // if (res && res.accessToken && res.refreshToken) {
      //   originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
      //   return axios(originalRequest);
      // }
      // clearSession();
      //   } catch {
      //     clearSession();
      //   }
      // }

      if (
        (error.response && error.response?.data?.message) ||
        error.response.status !== 200 ||
        error.response.status !== 201
      ) {
        handleResponseMessage(
          error.response,
          eNotificationType.Error,
          useToast
        );
      }
      if (error.response.status === eHttpResponse.NotFound) {
        Error("axiosInit: action not found");
      }
    }
  });
};

export default axiosInit;
