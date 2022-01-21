import { LOGIN, REQUEST_PASSWORD_RESET, RESET_PASSWORD, CHANGE_PASSWORD, ERROR } from '../constants/ActionTypes';
import { toast } from 'react-toastify'



const AuthReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };

    case ERROR:
      toast.error(action.payload, {
        position: toast.POSITION.TOP_RIGHT, autoClose: 10000
      })
      return { ...state, isError: action.payload };

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