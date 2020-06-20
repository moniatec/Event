import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'
import Nav from './components/Nav';
import EventPage from './components/EventPage';
import CreateEvent from './components/CreateEvent'
import Upload from './components/Upload'
import MyEvents from './components/MyEvents'
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
          <Route render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames='fade'
              >
                <Switch>
                  <Route exact path="/home"
                    component={Home}
                  // token={props.token}
                  />

                  <AuthRoute
                    exact
                    path="/login"
                    component={Login}
                    token={props.token}
                  />
                  <AuthRoute
                    exact
                    path="/signup"
                    component={Register}
                    token={props.token}
                  />
                  <Route exact path="/events/:eventId"
                    component={EventPage}
                  // token={props.token}
                  />
                  <Route exact path="/create"
                    component={CreateEvent}

                  />
                  <Route exact path="/upload"
                    component={Upload}

                  />
                  <Route exact path="/my_events"
                    component={MyEvents}

                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />
        </BrowserRouter>
      </Theme>
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.authentication.token,
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