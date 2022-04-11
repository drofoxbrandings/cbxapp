import { LOGIN, IS_LOGGEDIN, LOADING, REQUEST_PASSWORD_RESET, RESET_PASSWORD, CHANGE_PASSWORD, ERROR, ERROR_MESSAGE } from '../constants/ActionTypes';

const initialState = {
  loading: false,
  isLoggedin: false,
  user: {},
  isError: false,
  errorMessage: '',
  data: ''
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };

    case IS_LOGGEDIN:
      return { ...state, isLoggedin: action.payload };

    case LOGIN:
      return { ...state, user: action.payload };

    case ERROR:
      return { ...state, isError: action.payload };

    case ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };

    case REQUEST_PASSWORD_RESET:
      return { ...state, data: action.payload };

    case RESET_PASSWORD:
      return { ...state, data: action.payload };

    case CHANGE_PASSWORD:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};

export default AuthReducer;
