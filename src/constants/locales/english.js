import configurables from '../configurables';
const locale = {
  AUTH_LOGIN_REQUEST_MESSAGE: 'Please login with your Andela account.',
  AUTH_SESSION_EXPIRED_MESSAGE: "Your session has expired \n Login again with your Andela account.",
  AUTH_LOGIN_SUCCESS_TITLE_MESSAGE: 'Login Successful',
  AUTH_WELCOME_MESSAGE: (name, appName = configurables.shortAppName) => {
    return `${name}, welcome to ${appName}`;
  },
  WELCOME_TITLE_MESSAGE: (appName = configurables.shortAppName) => {
    return `Welcome to ${appName}`;
  },
  ERROR_TITLE_MESSAGE: 'An error occured',
  ERROR_REPORTED_MESSAGE: 'Error has been reported',
  ERROR_OBJECT_REPORTED_MESSAGE: (error) => {
    return `This error has been reported: \n${error}`;
  },
};

export default locale;