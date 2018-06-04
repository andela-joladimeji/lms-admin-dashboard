import 'isomorphic-fetch';
import { apiDelayForDevelopment, apiDelayForTests, apiDelayForProdution, useMockApi, apiTimeoutMiliseconds } from '../constants/configurables'; // eslint-disable-line no-unused-vars
import mockAuthApi from './mock/mockAuthApi';
import { getRolesPermissionsUrl } from '../constants/urls';
import { success, statusToString } from './responseStatuses';
import authHelper from '../utils/authHelper';
import locales from '../constants/locales';
import messageTypes from '../constants/messageTypes';
import logger from '../utils/loggerHelper';

const NODE_ENV = process.env.NODE_ENV;
let delay = 0;

switch(NODE_ENV) {
  case 'production':
    delay = apiDelayForProdution;
    break;
  case 'test':
    delay = apiDelayForTests;
    break;
  case 'development':
    delay = apiDelayForDevelopment;
    break;
  default:
    delay = 1000;
}

// This was intentionally written using the factory function pattern
// which is an alternative to class functions.
/**
 * This class handles all API calls to Authentication service
 */
const AuthApi = function() {
  // PRIVATE FUNCTIONS
  /**
   * This should not be done at all, it will check if the current 
   * environment is development before allowing unauthorized certificates
   */
  const allowUnauthorizedCertificate = function() {
    if (NODE_ENV === 'development') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    }
  };

  /**
   * This will reject unauthorized certificates
   */
  const rejectUnauthorizedCertificate = function() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
  };

  /**
   * @param {string} userRoles
   */
  const fetchRolesPermissions = function(userRoles, token = '') {
    return fetch(getRolesPermissionsUrl(userRoles), {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (success.includes(response.status)) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(statusToString[response.status]);
      }
    }).catch((error) => {
      return Promise.reject(error);
    });
  };

  // PUBLIC FUNCTIONS
  return {
    /**
     * This checks if the current user has logged in or not
     * This works based on application configuration. 
     * Any rejected promise from this function is wrapped in loggerObject
     */
    authenticateUser: function() {
      if (useMockApi) return mockAuthApi.authenticateUser(delay);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const token = authHelper.getGoogleAuthToken();
            if (token === undefined || token.trim() === '') {
              const logObject = logger().wrapMessage(messageTypes.ERROR, locales.AUTH_LOGIN_REQUEST_MESSAGE, locales.WELCOME_TITLE_MESSAGE());
              reject(logObject);
            }
            if (authHelper.isGoogleAuthTokenExpired()) {
              const logObject = logger().wrapMessage(messageTypes.ERROR, locales.AUTH_SESSION_EXPIRED_MESSAGE, locales.ERROR_TITLE_MESSAGE);
              reject(logObject);
            }
            const decodedData = authHelper.getDecodedGoogleAuthToken();
            const userData = decodedData.UserInfo;
            const userRoles = Object.keys(userData.roles).map(role => userData.roles[role]).join(',');
            allowUnauthorizedCertificate();
            fetchRolesPermissions(userRoles, token)
              .then((response) => {
                userData.permissions = response.values;
                userData.expiryDate = decodedData.exp;
                rejectUnauthorizedCertificate();
                resolve(userData);
              })
              .catch((error) => {
                const logObject = logger().wrapMessage(messageTypes.ERROR, error, locales.ERROR_TITLE_MESSAGE);
                reject(logObject);
              });
          } catch (error) {
            const logObject = logger().wrapMessage(messageTypes.ERROR, error, locales.ERROR_TITLE_MESSAGE);
            reject(logObject);
          }
        }, delay);
      });
    }
  };
};

// This class is closed to modification from outside calls
/**
 * This class handles all API calls to Authentication service
 */
export default AuthApi();
