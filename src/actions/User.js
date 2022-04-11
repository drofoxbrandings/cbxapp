import {
    LOADING,
    ERROR,
    ERROR_MESSAGE,
    GET_USERS,
    GET_USER,
} from "../constants/ActionTypes";

import * as api from '../api/index.js'
import _ from "lodash";
import { toast } from 'react-toastify'

export const User = (uid, navigate) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    try {
        const { data } = await api.getSingleUser(uid)
        const status = _.get(data, 'status')
        if (status === '200') {
            dispatch({ type: LOADING, payload: false })
            dispatch({ type: GET_USER, payload: data })
            navigate('/profile')
        }
        else {
            dispatch({ type: LOADING, payload: false })
            dispatch({ type: ERROR, payload: true })
            dispatch({ type: ERROR_MESSAGE, payload: data.message })
        }

    } catch (error) {
        dispatch({ type: LOADING, payload: false })
        dispatch({ type: ERROR, payload: true })
        dispatch({ type: ERROR_MESSAGE, payload: error.message })
    }
};