import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      Cookies.set("token", action.payload, { expires: 1 });
    },
    clearToken(state) {
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
