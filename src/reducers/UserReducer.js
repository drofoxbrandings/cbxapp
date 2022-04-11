import {
    LOADING,
    ERROR,
    ERROR_MESSAGE,
    GET_USERS,
    GET_USER,
} from '../constants/ActionTypes';

const initialState = {
    loading: false,
    isError: false,
    errorMessage: '',
    user: {},
    users: {}
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.payload };

        case ERROR:
            return { ...state, isError: action.payload };

        case ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };

        case GET_USER:
            return { ...state, user: action.payload };

        case GET_USERS:
            return { ...state, user: action.payload };

        default:
            return state;
    }
};

export default AuthReducer;
