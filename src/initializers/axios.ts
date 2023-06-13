import axios, { AxiosRequestConfig } from "axios";
import JwtManager from "../utils/jwtManager";
// import eHttpResponse from "../assets/enums/eHttpResponse";
import eNotificationType from "../assets/eNotificationType";
// import { toast } from "VUE-toastify";
// import { navigateTo } from "../store/stores/navigation/navigation.store";
import AuthManager from "../utils/authManager";

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
  message: string,
  notificationType: any
) => {
  switch (notificationType) {
    case eNotificationType.Success:
        // this.$toast.open({
        //     message: message,
        //     type: "success",
        //     // all of other options may go here
        // });
      break;
    case eNotificationType.Error:
        // this.$toast.open({
        //     message: message,
        //     type: "error",
        //     // all of other options may go here
        // });
      break;
    default:
      Error("handleResponseMessage: Notification Type not handled");
  }
};

const axiosInit = async () => {
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
    if (error.response) {
      if (
        error.response.status === "Unauthorized" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          // const res = await AuthManager.refreshToken(
          //   JwtManager.accessToken,
          //   JwtManager.refreshToken
          // );
          // if (res && res.accessToken && res.refreshToken) {
          //   originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
          //   return axios(originalRequest);
          // }
          // clearSession();
        } catch {
          clearSession();
        }
      }
      if (error.response.data?.Message) {
        handleResponseMessage(
          error.response.data?.Message,
          eNotificationType.Error
        );
      }
      if (error.response.status === "Not Found") {
        Error("axiosInit: action not found");
      }
    }
  });
};

export default axiosInit;