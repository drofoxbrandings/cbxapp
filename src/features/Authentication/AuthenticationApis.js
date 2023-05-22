import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cbxAxios } from "../../app/axios";


export const userLogin = createAsyncThunk(
  "userLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.post(
        `/auth/login`,
        loginData
      );
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const sendPasswordResetLink = createAsyncThunk(
  "sendPasswordResetLink",
  async (apiData, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.post(
        `/auth/sendPasswordResetLink`,
        apiData
      );
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "newPassword",
  async (apiData, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.post(
        `/auth/resetPassword`,
        apiData
      );
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
