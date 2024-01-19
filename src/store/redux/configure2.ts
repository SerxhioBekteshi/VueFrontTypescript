// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import auth, { getUser } from "../stores/auth";

const initStore = () => {
  const store = configureStore({
    reducer: {
      auth,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  store.dispatch(getUser());
  return store;
};
export const store = initStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
