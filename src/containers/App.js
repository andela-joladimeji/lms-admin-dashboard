import React from 'react';
import { object, string, element, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routeActions  from '../actions/routeActions';
import layoutHelper from '../utils/layoutHelper';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  componentDidMount() {
    const { isPageLoading } = this.props;
    layoutHelper.tooglePageLoader(isPageLoading);
  }

  componentDidUpdate() {
    //TODO: needs refactoring
    const {isPageLoading} = this.props;
    layoutHelper.tooglePageLoader(isPageLoading);
  }

  render() {
    return this.props.children;
  }
}

App.propTypes = {
  actions: object,
  redirectUrl: string,
  children: element,
  isLoggedIn: bool.isRequired,
  isPageLoading: bool.isRequired,
  progress: element,
  currentURL: string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isPageLoading: state.loader.pageLoading,
    isLoggedIn: state.loggedIn,
    redirectUrl: state.redirectUrl,
    currentURL: ownProps.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
