import React from 'react';
import '../styles/login-page.css';
import urls from '../constants/urls';

export const LoginPage = () => {
  return (
    <div className="login">
      <a className="loginLink" href={`${urls.FULL_LOGIN_URL}`}>
        <span className="fa fa-google googleIcon" />
        Login with Google
      </a>
    </div>
  );
};

export default LoginPage;
