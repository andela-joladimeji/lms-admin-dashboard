import initialState from './initialState';
import types from '../constants/actionTypes';

export default function(state = initialState.redirectUrl, action) {
  switch(action.type) {
    case types.SET_REDIRECT_URL:
      return action.url;
    default:
      return state;
  }
}