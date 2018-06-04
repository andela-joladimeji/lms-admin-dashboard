import alert from './alertHelper';
import types from '../constants/messageTypes';
import locale from '../constants/locales';

// This was intentionally written using the factory function pattern
// which is an alternative to class functions.
/**
 * LoggerHanlder
 * @param {(Object|Object[])} logger 
 * This class handles all the exception
 * Alert was passed as the default logging handler
 * You can create a wrapper object using adapter pattern for any
 * logChannel passed to this function to conform with alert Object format
 */
const LoggerHanlder = function(logChannel = alert) {
  const getLogger = function() {
    // Logger configuration goes here
    return logChannel;
  };

  const logError = function(message, title) {
    const logger = getLogger();
    if (typeof message !== 'string') {
      logger.error(locale.ERROR_OBJECT_REPORTED_MESSAGE(message), title);
    } else {
      logger.error(message, title);
    }
  };

  const logSuccess = function(message, title) {
    const logger = getLogger();
    logger.success(message, title);
  };

  const logWarning = function(message, title) {
    const logger = getLogger();
    logger.warning(message, title);
  };

  const logInfo = function(message, title) {
    const logger = getLogger();
    logger.info(message, title);
  };

  const wrap = function(type, message, title) {
    const logObject = {
      type,
      message,
      title
    };
    return logObject;
  };

  return {
    logMessage: function(logObject) {
      try {
        const {type, message, title} = logObject;
        switch(type) {
          case types.ERROR:
            logError(message, title);
            break;
          case types.WARNING:
            logWarning(message, title);
            break;
          case types.INFO:
            logInfo(message, title);
            break;
          case types.SUCCESS:
            logSuccess(message, title);
            break;
          default:
            logError(message, title);
        }
      } catch(error) {
        console.log(error); // eslint-disable-line no-console
        logError(logObject, locale.ERROR_TITLE_MESSAGE);
      }
    },

    /**
     * wrapMessage - wrap the param in a log Object
     * @param {messageTypes} type
     * @param {(string|object)} message
     * @param {string} title
     */
    wrapMessage: function(type, message, title) {
      return wrap(type, message, title);
    }
  };
};

// This class is closed to modification from outside calls
export default LoggerHanlder;