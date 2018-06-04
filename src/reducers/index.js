import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import loader from './loaderReducer';
import loginStatus from './loginStatusReducer';
import redirectUrl from './redirectUrlReducer';
import review from './review';

const rootReducer = combineReducers({
  redirectUrl,
  loggedIn: loginStatus,
  user,
  loader,
  review,
  routing: routerReducer
});

export default rootReducer;
