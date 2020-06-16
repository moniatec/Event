import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register'
import Nav from './components/Nav';

import Theme from './Theme';
// import Splash from './components/Splash'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ProtectedRoute, AuthRoute } from "./authRoutes";
import { CssBaseline, } from "@material-ui/core";

function App(props) {
  return (
    <>
      <CssBaseline />
      <Theme>
        <BrowserRouter>
          <Nav props={props} />

          <Switch>
            {/* <AuthRoute exact path="/"
                    component={Splash}
                    currentUserId={props.currentUserId}
                  /> */}

            <AuthRoute
              path="/login"
              component={Login}
              currentUserId={props.currentUserId}
            />
            <AuthRoute
              path="/register"
              component={Register}
              currentUserId={props.currentUserId}
            />
          </Switch>

        </BrowserRouter>
      </Theme>
    </>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.authentication.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  App
);