/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderAuthLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link to="/signout" className="nav-link">
            Sign out
          </Link>
        </li>,
      ];
    }
    return [
      <li className="nav-item" key={2}>
        <Link to="/signin" className="nav-link">
          Sign in
        </Link>
      </li>,
      <li className="nav-item" key={3}>
        <Link to="/signup" className="nav-link">
          Sign up
        </Link>
      </li>,
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <ul className="nav navbar-nav">{this.renderAuthLinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
