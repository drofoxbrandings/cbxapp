import {
    LOADING,
    ERROR,
    ERROR_MESSAGE,
    SHIPMENT
} from "../constants/ActionTypes";

import * as api from '../api/index.js'
import _ from "lodash";
import { toast } from 'react-toastify'

export const getShipment = () => async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    try {
        const { data } = await api.getShipment()
        const status = _.get(data, 'status')
        if (status === '200') {
            dispatch({ type: ERROR, payload: false })
            dispatch({ type: ERROR_MESSAGE, payload: '' })
            dispatch({ type: SHIPMENT, payload: data })
            dispatch({ type: LOADING, payload: false })
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