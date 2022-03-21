import { LOGIN, IS_LOGGEDIN, LOADING, REQUEST_PASSWORD_RESET, RESET_PASSWORD, CHANGE_PASSWORD, ERROR, ERROR_MESSAGE } from "../constants/ActionTypes";

import * as api from '../api/index.js'
import _ from "lodash";
import SecureLS from 'secure-ls'
import { toast } from 'react-toastify'

const ls = new SecureLS({ encodingType: "aes" })
export const Login = (loginData, navigate) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  try {
    const { data } = await api.Login(loginData)
    const authToken = _.get(data, "token", "");
    if (authToken) {
      dispatch({ type: LOADING, payload: false })
      dispatch({ type: LOGIN, payload: data })
      dispatch({ type: IS_LOGGEDIN, payload: true })
      ls.set('AuthToken', data.token)
      ls.set('isLoggedIn', true)
      navigate('/dashboard')
    }
    else {
      dispatch({ type: LOADING, payload: false })
      dispatch({ type: ERROR, payload: true })
      dispatch({ type: ERROR_MESSAGE, payload: data.message })
      ls.set('AuthToken', "")
    }

  } catch (error) {
    dispatch({ type: LOADING, payload: false })
    dispatch({ type: ERROR, payload: true })
    dispatch({ type: ERROR_MESSAGE, payload: error.message })
    ls.set('AuthToken', "")
  }
};

export const SendResetLink = (email, resetForm) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  try {
    const { data } = await api.ResetPasswordLink(email)
    if (data) {
      dispatch({ type: LOADING, payload: false })
      if (data.status === "200") {
        dispatch({ type: ERROR, payload: false })
        dispatch({ type: REQUEST_PASSWORD_RESET, payload: data })
        resetForm()
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT, autoClose: 5000
        })
      }
      if (data.status === "404") {
        dispatch({ type: ERROR, payload: true })
        dispatch({ type: ERROR_MESSAGE, payload: data.message })
      }
    }

  } catch (error) {
    dispatch({ type: LOADING, payload: false })
    dispatch({ type: ERROR, payload: true })
    dispatch({ type: ERROR_MESSAGE, payload: error.message })
  }
};

export const ResetPassword = (resetData, navigate, resetForm) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  try {
    const { data } = await api.ResetPassword(resetData)
    if (data.status === "200") {
      dispatch({ type: RESET_PASSWORD, payload: data })
      dispatch({ type: LOADING, payload: false })
      setTimeout(() => {
        resetForm()
        navigate('/')
      }, 2000);
    }
    if (data.status === "404" || data.status === "403") {
      dispatch({ type: ERROR, payload: true })
      dispatch({ type: ERROR_MESSAGE, payload: data.message })
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: true })
    dispatch({ type: ERROR_MESSAGE, payload: error.message })
  }
}

export const logout = async (navigate) => {
  ls.removeAll()
  ls.clear()
  navigate('/')
}
