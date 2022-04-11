import { LOGIN, IS_LOGGEDIN, LOADING, REQUEST_PASSWORD_RESET, RESET_PASSWORD, CHANGE_PASSWORD, ERROR, ERROR_MESSAGE } from "../constants/ActionTypes";

import * as api from '../api/index.js'
import _ from "lodash";
import SecureLS from 'secure-ls'
import { toast } from 'react-toastify'

const ls = new SecureLS({ encodingType: "aes" })
export const Login = (loginData, navigate) => async (dispatch) => {
  ls.clear()
  dispatch({ type: LOADING, payload: true })
  try {
    const { data } = await api.Login(loginData)
    const authToken = _.get(data, "token", "");
    if (authToken) {
      dispatch({ type: LOGIN, payload: data })
      dispatch({ type: IS_LOGGEDIN, payload: true })
      dispatch({ type: ERROR, payload: false })
      dispatch({ type: ERROR_MESSAGE, payload: '' })
      ls.set('AuthToken', data.token)
      ls.set('user', data.userId)
      navigate('/dashboard')
      dispatch({ type: LOADING, payload: false })
    }
    else {
      dispatch({ type: IS_LOGGEDIN, payload: false })
      dispatch({ type: LOADING, payload: false })
      dispatch({ type: ERROR, payload: true })
      dispatch({ type: ERROR_MESSAGE, payload: data.message })
      ls.set('AuthToken', "")
    }

  } catch (error) {
    dispatch({ type: IS_LOGGEDIN, payload: false })
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
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT, autoClose: 5000
      })
      setTimeout(() => {
        resetForm()
        navigate('/')
      }, 2000);
      dispatch({ type: LOADING, payload: false })
    }
    if (data.status === "404" || data.status === "403" || data.status === "400") {
      dispatch({ type: ERROR, payload: true })
      dispatch({ type: ERROR_MESSAGE, payload: data.message })
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: true })
    dispatch({ type: ERROR_MESSAGE, payload: error.message })
  }
}

export const ChangePassword = (pwdData, navigate, resetForm) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  try {
    const { data } = await api.ChangePassword(pwdData)
    if (data.status === "200") {
      dispatch({ type: CHANGE_PASSWORD, payload: data })
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT, autoClose: 5000
      })
      setTimeout(() => {
        resetForm()
        navigate('/profile')
      }, 2000);
      dispatch({ type: LOADING, payload: false })
      dispatch({ type: ERROR, payload: false })
      dispatch({ type: ERROR_MESSAGE, payload: '' })
    }
    else {
      dispatch({ type: ERROR, payload: true })
      dispatch({ type: ERROR_MESSAGE, payload: data.message })
      setTimeout(() => {
        resetForm()
      }, 1000);

    }
  } catch (error) {
    dispatch({ type: ERROR, payload: true })
    dispatch({ type: ERROR_MESSAGE, payload: error.message })
    setTimeout(() => {
      resetForm()
    }, 1000);
  }
}

export const logout = (navigate) => (dispatch) => {
  dispatch({ type: IS_LOGGEDIN, payload: false })
  ls.removeAll()
  ls.clear()
  navigate('/')
}
