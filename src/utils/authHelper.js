import { urls, envs, configurables } from '../constants';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import { browserHistory } from 'react-router';
import { timestampToDate, isPastDate } from './dateHelper';

export class AuthHelper {
  static authenticate(forceRedirectToRoot = false) {
    const loggedIn = this.isLoggedIn();
    if (!loggedIn) this.redirect(urls.LOGIN_PATH);
    if (loggedIn && forceRedirectToRoot) this.redirect(urls.ROOT_PATH);
  }

  /**
   * isLoggedIn
   * @return {boolean} true if loggedIn, otherwise false
   */
  static isLoggedIn() {
    const data = this.getUserCookieData();
    if (!data || data === '') return false;
    const decodedData = jwt.decode(data, envs.keys.secretKey);
    if (!decodedData.expiryDate) {
      return false;
    }
    const expiryDate = timestampToDate(decodedData.expiryDate);
    if (expiryDate && !isPastDate(expiryDate) && decodedData.loggedIn) {
      return true;
    }
    return false;
  }

  static logOut() {
    const cookieAttributes = {
      expires: configurables.cookieExpiryPeriod,
      domain: configurables.cookieDomain
    };
    this.removeCookie(envs.keys.cookieKey, cookieAttributes);
    this.removeCookie(configurables.googleAuthToken);
  }

  static getGoogleAuthToken() {
    return this.getCookie(configurables.googleAuthToken);
  }

  static getDecodedGoogleAuthToken() {
    const token = this.getGoogleAuthToken();
    return jwtDecode(token);
  }

  static isGoogleAuthTokenExpired() {
    const expirationDate = this.getGoogleAuthTokenExpiryDate();
    return isPastDate(expirationDate);
  }

  static getGoogleAuthTokenExpiryDate() {
    const token = this.getDecodedGoogleAuthToken();
    if (!token.exp) { return null; }
    return timestampToDate(token.exp);
  }

  /**
   * removeCookie - Remove entry from Cookie store
   * @param {string} name 
   * @param {Cookie.CookieAttributes} options 
   */
  static removeCookie(name, options = undefined) {
    Cookie.remove(name, options);
  }

  static getCookie(name) {
    return Cookie.get(name);
  }

  static getAllCookies() {
    return Cookie.get();
  }

  /**
   * setCookie - Set Cookie store
   * @param {string} name
   * @param {*} value 
   * @param {Cookie.CookieAttributes} options 
   */
  static setCookie(name, value, options = undefined) {
    Cookie.set(name, value, options);
  }

  /**
   * setUserCookieData
   * @param {Object} userData 
   * set loggedIn object, decrypt object and set cookie
   */
  static setUserCookieData(userData) {
    const loggedIn = {
      loggedIn: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        roles: Object.keys(userData.roles)
      },
      expiryDate: userData.expiryDate
    };
    const encodedData = jwt.encode(loggedIn, envs.keys.secretKey);
    if (encodedData === this.getUserCookieData()) return;
    const cookieAttributes = {
      expires: configurables.cookieExpiryPeriod,
      domain: configurables.cookieDomain
    };
    this.setCookie(envs.keys.cookieKey, encodedData, cookieAttributes);
  }

  static getUserCookieData() {
    return this.getCookie(envs.keys.cookieKey);
  }

  /**
   * redirectToRoot - Redirect to / if current location is fromLocation
   * this function enforces that you can only redirect from the current location
   * if correctly specified
   * @param {string} from - the currrent location
   * @param {string} to - the specified location
   */
  static redirectFromHere(from = undefined, to = '/') {
    const currentLocation = browserHistory.getCurrentLocation().pathname;
    if (from && from === currentLocation) {
      browserHistory.push(to);
    }
  }

  /**
   * redirectToRoot - Redirect to a specific location
   * @param {string} to - the specified location
   */
  static redirect(to = '/') {
    browserHistory.push(to);
  }
}

export default AuthHelper;
