import { LOGIN, ERROR } from "../constants/ActionTypes";

import * as api from '../api/index.js'



export const Login = (loginData) => async (dispatch) => {
  try {
    await api.Login(loginData)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.message === "Success") {
            dispatch({ type: LOGIN, payload: res })
          }
          else {
            dispatch({ type: ERROR, payload: res.data.message })
          }
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};