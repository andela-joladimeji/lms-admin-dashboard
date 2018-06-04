import React from 'react';
import { string, func } from 'prop-types';
import { IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import '../../styles/header.scss';
import logo from '../../images/logo.png';
import { urls, configurables } from '../../constants';

const Header = ({ name, picture, logOut }) => {
  return (
    <AppBar
        className="app-header"
        title={<IndexLink to={urls.ROOT_PATH} className="app-title">{configurables.shortAppName}</IndexLink>}
        iconElementLeft={
          <IndexLink to="/">
            <img
                src={logo}
                width={35}
                className={"app-logo"}
                role="presentation"
            />
          </IndexLink>
        }
        iconElementRight={
          <div>
            <span className="user-name">
              {name}
            </span>
            <IconMenu
                iconButtonElement={
                  <IconButton
                      style={{padding: '0px 15px 0px 0px'}}>
                    <Avatar
                        src={picture}
                        size={35}
                        className={"user-avatar"}
                    />
                  </IconButton>
                }
                targetOrigin={{ horizontal: "left", vertical: "bottom" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
                <MenuItem primaryText="Sign out" onTouchTap={logOut} />
            </IconMenu>
          </div>
        }
        zDepth={2}
    />
  );
};

Header.propTypes = {
  name: string.isRequired,
  picture: string.isRequired,
  logOut: func.isRequired
};

export default Header;
