import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: Cookie.get("userId"),
    userName: Cookie.get("userName"),
  },
  reducers: {
    setPresentUserId: (state, action) => {
      state.userId = action.payload;
    },
    setPresentUsername: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setPresentUserId, setPresentUsername } = userSlice.actions;

export default userSlice.reducer;
