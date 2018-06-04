import types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.user, action) {
  switch(action.type) {
    case types.USER_DATA_LOAD_SUCCESS:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}
