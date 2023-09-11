import { combineReducers } from "@reduxjs/toolkit";
import userStore from "../stores/user.store";
import toDoStore from "../stores/toDo.store";

const rootReducer = combineReducers({
  user: userStore.reducer,
  todos: toDoStore.reducer,
});

export default rootReducer;
