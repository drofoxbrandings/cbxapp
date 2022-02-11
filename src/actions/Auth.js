import { LOGIN, ERROR, REQUEST_PASSWORD_RESET, RESET_PASSWORD } from "../constants/ActionTypes";

import * as api from '../api/index.js'
import _ from "lodash";
import SecureLS from 'secure-ls'

const ls = new SecureLS({ encodingType: "aes" })
export const Login = (loginData, callback, navigate) => async (dispatch) => {
  try {
    const { data } = await api.Login(loginData)
    const authToken = _.get(data, "token", "");
    if (authToken) {
      dispatch({ type: LOGIN, payload: data })
      ls.set('AuthToken', data.token)
      navigate('/dashboard')
    }
    else {
      dispatch({ type: ERROR, payload: data.message })
      localStorage.set('AuthToken', "")
    }

  } catch (error) {
    callback(error.message);
  }
};

export const SendResetLink = (email, callback) => async (dispatch) => {
  try {
    const { data } = await api.ResetPasswordLink(email)
    if (data.status === "200") {
      dispatch({ type: REQUEST_PASSWORD_RESET, payload: data })
    }
    if (data.status === "404") {
      dispatch({ type: ERROR, payload: data.message })
    }

  } catch (error) {
    callback(error.message);
  }
};

export const ResetPassword = (resetData, callback, navigate) => async (dispatch) => {
  try {
    const { data } = await api.ResetPassword(resetData)
    console.log(data)
    if (data.status === "200") {
      dispatch({ type: RESET_PASSWORD, payload: data })
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
    if (data.status === "404" || data.status === "403") {
      dispatch({ type: ERROR, payload: data.message })
    }
  } catch (error) {
    callback(error.message);
  }
}

export const logout = async (navigate) => {
  ls.removeAll()
  ls.clear()
  navigate('/')
}