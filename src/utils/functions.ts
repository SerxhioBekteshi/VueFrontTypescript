import { IUserState } from "@/interfaces/other/IUserState";
import JwtManager from "./jwtManager";
import AuthManager from "./authManager";
import initStore from "@/store/redux/initStore";
import { eFilterOperator } from "@/assets/enums/eFilterOperator";
import axiosInit from "@/initializers/axios";
import { useToast } from "vue-toast-notification";
import store from "@/store/vuexStore/storeModules";

export function getNameById(myObject: any, id: number) {
  for (const [key, value] of Object.entries(myObject)) {
    if (value === id) {
      const nameKey = key === "id" ? "name" : "id"; // Assuming 'name' is the opposite key
      return myObject[nameKey];
    }
  }
  return null;
}

const reverseString = (str: any) => {
  return str.split("").reverse().join("");
};

export const groupDigital = (num: any) => {
  const emptyStr = "";
  const group_regex = /\d{3}/g;

  // delete extra comma by regex replace.
  const trimComma = (str: any) => {
    return str.replace(/^[,]+|[,]+$/g, emptyStr);
  };

  const str = num + emptyStr;
  const [integer, decimal] = str.split(".");

  const conversed = reverseString(integer);

  const grouped = trimComma(
    reverseString(conversed.replace(/\d{3}/g, (match: any) => `${match},`))
  );

  return !decimal
    ? `${grouped}.00`
    : decimal.length == 1
    ? `${grouped}.${decimal}0`
    : `${grouped}.${decimal.substring(0, 2)}`;
};

export const toCamelCase = (string: any) => {
  return string
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^./, (firstChar: any) => firstChar.toUpperCase());
};

export const calculateFiltersForMeal = (array: any) => {
  const formattedArray: {
    columnName: string;
    value: any;
    operation: eFilterOperator;
  }[] = [];

  Object.entries(array).forEach(([columnName, value]) => {
    if (Array.isArray(value)) {
      // If the value is an array, include the column for each item in the array
      value.forEach((item: any) => {
        formattedArray.push({
          columnName,
          value: item,
          operation: eFilterOperator.Contain,
        });
      });
    } else if (typeof value === "string" && value.includes("-")) {
      const [valueStart, valueEnd] = value.split("-");
      formattedArray.push({
        columnName,
        value: Number(valueStart),
        operation: eFilterOperator.GreaterOrEqual,
      });
      formattedArray.push({
        columnName,
        value: Number(valueEnd),
        operation: eFilterOperator.LessOrEqual,
      });
    } else if (typeof value === "string" && value.startsWith(">")) {
      formattedArray.push({
        columnName,
        value,
        operation: eFilterOperator.GreaterOrEqual,
      });
    } else {
      formattedArray.push({
        columnName,
        value,
        operation: eFilterOperator.Contain,
      });
    }
  });
  return formattedArray;
};

export const initApp = async () => {
  await axiosInit(useToast);
  let currentUser: IUserState | null = null;
  try {
    if (JwtManager.accessToken) {
      currentUser = await AuthManager.getUserData();
    }
  } catch (e) {
    console.log("initApp", e);
  }

  if (currentUser) {
    store.commit("setUser", currentUser);
  }

  // const appStore = initStore(currentUser);
  // return appStore;
};

export default initApp;
