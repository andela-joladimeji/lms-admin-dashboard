import environment from './envVariables';

const API_URL = environment.auth.apiUrl;
const GATEWAY_URL = environment.auth.gatewayUrl;
const LOGIN_URL = environment.auth.url;
const REDIRECT_URL = `${window.location.protocol}//${window.location.host}`;
const FULL_LOGIN_URL = `${LOGIN_URL}?redirect_url=${REDIRECT_URL}`;
export const LOGGEDIN_PATH = '/loggedin';
export const LOGIN_PATH = 'login';
export const ROOT_PATH = '/';

/**
 * getRolesPermissionsUrl
 * @param {string} roles - The comma seperated list of roles without white space
 * @returns {string} - A full url for fetching permissions attached to the param passed
 */
export function getRolesPermissionsUrl(roles = '') {
  return `${GATEWAY_URL}/api/v1/roles/${roles}/permissions`;
}

export default {
  API_URL,
  FULL_LOGIN_URL,
  GATEWAY_URL,
  LOGGEDIN_PATH,
  LOGIN_PATH,
  LOGIN_URL,
  REDIRECT_URL,
  ROOT_PATH
};
