import React, { Component, Fragment } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import M from "materialize-css";

import SignOut from "./Auth/SignOut";

const activeStyle = {
  backgroundColor: "rgba(0,0,0,0.1)"
};

class Header extends Component {
  componentDidMount() {
    M.Sidenav.init(document.querySelector(".sidenav"));
  }

  render() {
    const { authSession } = this.props;
    return (
      <Fragment>
        <nav className="teal">
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo">
              Sweet Recipes
            </Link>
            <a
              data-target="slide-out"
              className="sidenav-trigger"
              style={{ cursor: "pointer" }}
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <NavLink to="/search" activeStyle={activeStyle}>
                  Search
                </NavLink>
              </li>
              {authSession && authSession.getCurrentUser ? (
                <Fragment>
                  <li>
                    <NavLink to="/recipe/add" activeStyle={activeStyle}>
                      Add Recipe
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/profile" activeStyle={activeStyle}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <SignOut />
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <NavLink to="/signin" activeStyle={activeStyle}>
                      Sign In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" activeStyle={activeStyle}>
                      Sign Up
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="slide-out">
          {authSession && authSession.getCurrentUser ? (
            <Fragment>
              <li>
                <NavLink
                  to="/recipe/add"
                  activeStyle={activeStyle}
                  className="sidenav-close"
                >
                  Add Recipe
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/profile"
                  activeStyle={activeStyle}
                  className="sidenav-close"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <SignOut />
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <NavLink
                  to="/signin"
                  activeStyle={activeStyle}
                  className="sidenav-close"
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  activeStyle={activeStyle}
                  className="sidenav-close"
                >
                  Sign Up
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </Fragment>
    );
  }
}

export default withRouter(Header);
