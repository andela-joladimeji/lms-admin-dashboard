import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './components/home/HomePage';
import { ReviewContainer } from './containers/ReviewContainer';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="review-dashboard" component={ReviewContainer} />
  </Route>
);

