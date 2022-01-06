import { LOGIN, REQUEST_PASSWORD_RESET, RESET_PASSWORD, CHANGE_PASSWORD, ERROR } from '../constants/ActionTypes';

const AuthReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };

    case ERROR:
      return { ...state, message: action.payload };

    case REQUEST_PASSWORD_RESET:
      return { ...state, user: action.payload };

    case RESET_PASSWORD:
      return { ...state, user: action.payload };

    case CHANGE_PASSWORD:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default AuthReducer;