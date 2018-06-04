import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { urls } from '../constants';
import * as routeActions  from '../actions/routeActions';
import Header from '../components/common/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from '../constants/baseTheme';

class SecureContainer extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const { isLoggedIn, actions, currentURL } = this.props;
    if (!isLoggedIn) {
      actions.setRedirectUrl(currentURL);
      actions.navigateTo(urls.LOGIN_PATH);
    }
  }

  renderFullApp(picture, name, logOut) {
    return (
      <MuiThemeProvider muiTheme={baseTheme}>
        <div className="container">
          <Header picture={picture} name={name} logOut={logOut} />
          <div className="children">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  logOut(event) {
    event.preventDefault();
    this.props.actions.logOut();
  }

  render() {
    const { isLoggedIn, userData, isPageLoading } = this.props;
    if (!isPageLoading && isLoggedIn && userData) {
      return this.renderFullApp(userData.picture, userData.name, this.logOut);
    } else {
      return null;
    }
  }
}

SecureContainer.propTypes = {
  actions: PropTypes.object,
  currentURL: PropTypes.string,
  children: PropTypes.element,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.object,
  isPageLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isPageLoading: state.loader.pageLoading,
    userData: state.user,
    isLoggedIn: state.loggedIn,
    currentURL: ownProps.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecureContainer);