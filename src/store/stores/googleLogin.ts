// import eNotificationType from "@/assets/enums/eNotificationType";
import AuthManager from "@/utils/authManager";
import { AppThunk } from "../redux/appThunk";
import eNotificationType from "@/assets/enums/eNotificationType";

const onGoogleLogin =
  (payload: any, onError?: any): AppThunk =>
  async (router: any, toast: any) => {
    try {
      await AuthManager.googleLogin(payload, router);
    } catch (err: any) {
      console.log(err);
      toast.add({
        life: 3000,
        detail: err.message,
        severity: eNotificationType.Success,
        summary: "Error",
      });
    }
  };

export default onGoogleLogin;
