import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    user_type: null, // Initialize user_type
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
    setUserType(state, action) {
      state.user_type = action.payload; // Set user_type in state
    },
  },
});

// Export the actions
export const { setToken, clearToken, setUserType } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
