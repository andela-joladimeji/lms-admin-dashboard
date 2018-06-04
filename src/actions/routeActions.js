import types from '../constants/actionTypes';
import authHelper from '../utils/authHelper';
import { LOGIN_PATH } from '../constants/urls';

export function navigateTo(url) {
  authHelper.redirect(url);
  return { type: types.REDIRECT_APP };
}

export function setRedirectUrl(url) {
  return { type: types.SET_REDIRECT_URL, url };
}

function loggedOut() {
  return { type: types.USER_LOGGED_OUT };
}


export function logOut() {
  return dispatch => {
    authHelper.logOut();
    dispatch(loggedOut());
    dispatch(navigateTo(LOGIN_PATH));
  };
}