import { LOGIN, REQUEST_PASSWORD_RESET, RESET_PASSWORD, CHANGE_PASSWORD } from '../constants/ActionTypes';

const boardData = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload};

    default:
        return state;
  }
};

export default boardData;