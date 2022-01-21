import { LOGIN, ERROR } from "../constants/ActionTypes";

import * as api from '../api/index.js'
import _ from "lodash";


export const Login = (loginData, callback, navigate) => async (dispatch) => {
  try {
    const { data } = await api.Login(loginData)
    const loginStatus = _.get(data, "isLoggedIn", "");
    if (loginStatus) {
      dispatch({ type: LOGIN, payload: data })
      localStorage.setItem('AuthToken', data.token)
      navigate('/dashboard')
    }
    else {
      dispatch({ type: ERROR, payload: data.message })
      localStorage.setItem('AuthToken', "")
    }

  } catch (error) {
    callback(error.message);
  }
};