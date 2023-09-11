import { createSlice } from "@reduxjs/toolkit";

const toDoStore = createSlice({
  name: "todos",
  initialState: {
    todoList: [] as string[],
  },
  reducers: {
    addTask: (state, action) => {
      state.todoList.push(action.payload);
    },
    removeTodo: (state) => {
      state.todoList.pop();
    },
  },
});

export default toDoStore;

export const { addTask, removeTodo } = toDoStore.actions;
