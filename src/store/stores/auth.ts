import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import axios from "axios";

type AuthSliceType = {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};
const initialState: AuthSliceType = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
};

// Get user
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (undefined, thunkAPI) => {
    const response: any = await axios.get("/loggedUser");
    if (response && response.data) {
      return response.data;
    }
    return null;
  }
);

export const authSlice: Slice<any> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
