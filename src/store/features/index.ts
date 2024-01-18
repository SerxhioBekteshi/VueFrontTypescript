import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user/me",
  async (undefined, thunkAPI) => {
    const response: any = await axios.get("/user");
    if (response) {
      return response;
    }
    return null;
  }
);
