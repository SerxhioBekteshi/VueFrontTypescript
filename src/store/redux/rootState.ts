import store from "./configurations";
import rootReducer from "./rootReducer";

export type RootState = ReturnType<typeof rootReducer>;
