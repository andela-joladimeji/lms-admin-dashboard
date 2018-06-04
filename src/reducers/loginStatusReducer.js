import initialState from './initialState';
import types from '../constants/actionTypes';

export default function(state = initialState.loggedIn, action) {
  switch(action.type) {
    case types.USER_LOGGED_IN:
      return true;
    case types.USER_LOGGED_OUT || types.USER_LOGIN_FAILED:
      return false;
    default:
      return state;
  }
}