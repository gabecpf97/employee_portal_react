import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    password: "",
    email: "",
    userStatus: "not start",
    isHR: false, // default value
    housingId: null,
    userId: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.userStatus = action.payload.userStatus;
      state.isHR = action.payload.isHR;
      state.userId = action.payload.userId;
      state.housingId = action.payload.housingId;
    },
  }
});

export const { setUsername, setPassword, setEmail, setUser } = userSlice.actions;

export default userSlice.reducer;
