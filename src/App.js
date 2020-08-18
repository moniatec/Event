import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'
import Nav from './components/Nav';
import Splash from './components/Splash';
import SearchEvent from './components/SearchEvent';
import EventPage from './components/EventPage';
import CreateEvent from './components/CreateEvent'

import MyEvents from './components/MyEvents'
import Theme from './Theme';
import { loadToken } from "./store/authentication";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { AuthRoute, ProtectedRoute } from "./authRoutes";
import { CssBaseline, } from "@material-ui/core";

function App(props) {
  React.useEffect(() => {
    props.loadToken();

  }, [])
  return (
    <>
      <CssBaseline />
      <Theme>
        <BrowserRouter>
          <Nav props={props} location={props.location} />
          <Route render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames='fade'
              >
                <Switch>
                  <AuthRoute exact path="/"
                    component={Splash}
                  />
                  <ProtectedRoute exact path="/home"
                    component={Home}
                    token={props.token}
                    currentUserId={props.currentUserId}
                  />

                  <Route
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
                    token={props.token}
                    currentUserId={props.currentUserId}
                  />
                  <Route exact path="/create"
                    component={CreateEvent}
                    token={props.token}
                    currentUserId={props.currentUserId}

                  />
                  <Route exact path="/my_events"
                    component={MyEvents}
                    token={props.token}
                    currentUserId={props.currentUserId}

                  />
                  <Route exact path="/search"
                    component={SearchEvent}
                    token={props.token}
                    currentUserId={props.currentUserId}

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
    currentUserId: state.authentication.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadToken: () => dispatch(loadToken()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  App
);