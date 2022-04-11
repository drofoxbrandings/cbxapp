import {
    LOADING,
    ERROR,
    ERROR_MESSAGE,
    SHIPMENT
} from '../constants/ActionTypes';

const initialState = {
    loading: false,
    isError: false,
    errorMessage: '',
    shipment: []
}

const ShipmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.payload };

        case ERROR:
            return { ...state, isError: action.payload };

        case ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };

        case SHIPMENT:
            return { ...state, user: action.payload };

        default:
            return state;
    }
};

export default ShipmentReducer;
