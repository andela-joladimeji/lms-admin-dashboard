export default {
  auth: {
    url: process.env.AUTH_URL,
    apiUrl: process.env.API_URL,
    gatewayUrl: process.env.GATEWAY_URL,
    logoutUrl: process.env.AUTH_LOGOUT_URL,
    loggedInUrl: process.env.AUTH_LOGGEDIN_URL
  },
  keys: {
    segmentKey: process.env.FIS_SEGMENT_KEY,
    secretKey: process.env.SECRET_KEY,
    cookieKey: process.env.COOKIE_KEY
  }
};
