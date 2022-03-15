import { LOGIN, ERROR, IS_LOADING, IS REQUEST_PASSWORD_RESET, RESET_PASSWORD, CHANGE_PASSWORD  } from '../constants/ActionTypes';
import { toast } from 'react-toastify'

const initialState = {
isLoading: false,
  user: [],
  isLoggedin: false,
  isError: false
}


const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {...state, isLoading: action.payload}
    case LOGIN:
      return { ...state, user: action.payload};
    case IS_LOGGEDIN: 
      return {...state, isLoggedin: action.payload}
    case ERROR:
      return { ...state, isError: action.payload };

    case REQUEST_PASSWORD_RESET:
      toast.success(action.payload.message, {
        position: toast.POSITION.TOP_RIGHT, autoClose: 5000
      })
      return { ...state, user: action.payload };

    case RESET_PASSWORD:
      toast.success(action.payload.message, {
        position: toast.POSITION.TOP_RIGHT, autoClose: 5000
      })
      return { ...state, user: action.payload };

    case CHANGE_PASSWORD:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default AuthReducer;
