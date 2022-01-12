import { LOGIN, ERROR } from "../constants/ActionTypes";

import * as api from '../api/index.js'



export const Login = (loginData) => async (dispatch) => {
  try {
    await api.Login(loginData)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          if (res.data.isLoggedIn) {
            dispatch({ type: LOGIN, payload: res.data })
            localStorage.setItem('AuthToken', res.data.token)
          }
          else {
            dispatch({ type: ERROR, payload: res.data })
            localStorage.setItem('AuthToken', "")
          }
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};