import { createSlice } from "@reduxjs/toolkit";
import {
  resetPassword,
  sendPasswordResetLink,
  userLogin,
} from "./AuthenticationApis";

const initialState = {
  login: {
    apiStatus: "idle",
    statusCode: null,
    message: "",
    data: [],
  },
  sendPasswordResetLink: {
    apiStatus: "idle",
    statusCode: null,
    message: "",
  },
  resetUserPassword: {
    apiStatus: "idle",
    statusCode: null,
    message: "",
  },
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.login.apiStatus = "pending";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.login.apiStatus = "failed";
        state.login.statusCode = action.payload.status;
        state.login.message = action.payload.data.message;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.login.apiStatus = "success";
        state.login.statusCode = action.payload.status;
        state.login.message = action.payload.data.message;
        state.login.data = action.payload.data;
      })
      .addCase(sendPasswordResetLink.pending, (state) => {
        state.sendPasswordResetLink.apiStatus = "pending";
      })
      .addCase(sendPasswordResetLink.rejected, (state, action) => {
        state.sendPasswordResetLink.apiStatus = "failed";
        state.sendPasswordResetLink.statusCode = action.payload.status;
        state.sendPasswordResetLink.message = action.payload.data.message;
      })
      .addCase(sendPasswordResetLink.fulfilled, (state, action) => {
        state.sendPasswordResetLink.apiStatus = "success";
        state.sendPasswordResetLink.statusCode = action.payload.status;
        state.sendPasswordResetLink.message = action.payload.data.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetUserPassword.apiStatus = "pending";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetUserPassword.apiStatus = "failed";
        state.resetUserPassword.statusCode = action.payload.status;
        state.resetUserPassword.message = action.payload.data.message;
      });
  },
});

export const getLoggedInUser = (state) => state.authentication.login.data;

export default authenticationSlice.reducer;
