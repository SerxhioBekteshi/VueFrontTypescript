import store from "./configurations";
import rootReducer from "./rootReducer";

export type AppDispatch = ReturnType<typeof rootReducer>;
