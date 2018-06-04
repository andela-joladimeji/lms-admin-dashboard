import { beginAjaxCall, ajaxCallError, startPageLoad, stopPageLoad } from './loaderActions';
import AuthApi from '../api/authApi';
import { messageTypes, locales, actionTypes } from '../constants';
import authHelper from '../utils/authHelper';
import logger from '../utils/loggerHelper';

export function userLoggedIn() {
  return { type: actionTypes.USER_LOGGED_IN };
}

export function userLoggedOut() {
  return { type: actionTypes.USER_LOGGED_OUT };
}

export function userLoginFailed(error) {
  return { type: actionTypes.USER_LOGIN_FAILED, error };
}

export function userLogoutFailed(error) {
  return { type: actionTypes.USER_LOGOUT_FAILED, error };
}

export function userDataLoadSuccess(user) {
  return { type: actionTypes.USER_DATA_LOAD_SUCCESS, user };
}

export function userDataLoadFailed(error) {
  return { type: actionTypes.USER_DATA_LOAD_FAILED, error };
}

export function checkUserLogin() {
  const isLoggedIn = authHelper.isLoggedIn();
  return dispatch => {
    dispatch(startPageLoad());
    isLoggedIn ? dispatch(userLoggedIn()) : dispatch(userLoggedOut());
    dispatch(beginAjaxCall());
    return AuthApi.authenticateUser()
      .then(user => {
        authHelper.setUserCookieData(user);
        dispatch(userDataLoadSuccess(user));
        if (!isLoggedIn) {
          logger().logMessage({
            type: messageTypes.SUCCESS,
            message: locales.AUTH_WELCOME_MESSAGE(user.first_name),
            title: locales.AUTH_LOGIN_SUCCESS_TITLE_MESSAGE
          });
          dispatch(userLoggedIn());
        }
        dispatch(stopPageLoad());
      })
      .catch(error => {
        logger().logMessage(error);
        dispatch(ajaxCallError());
        isLoggedIn ? dispatch(userDataLoadFailed()) : dispatch(userLoginFailed());
        dispatch(userLoggedOut());
        dispatch(stopPageLoad());
      });
  };
}
