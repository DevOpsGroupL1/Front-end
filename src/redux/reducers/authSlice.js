import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    clearCurrentUser: () => {
      return null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
