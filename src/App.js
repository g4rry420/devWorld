import React,{ useEffect } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"
import { connect } from "react-redux"

import Homepage from "./pages/homepage/homepage.component"
import Header from "./components/header/header.component"
import Login from "./components/login/login.component"
import SignUp from "./components/signup/signup.component"
import Profiles from "./pages/profiles/profiles.component"
import Notifications from "./components/notifications/notifications.component"
import UserProfile from "./pages/user-profile/user-profile.component"
import { setCurrentUserAsync } from "./redux/user/user.actions"

function App(props) {
  useEffect(() => {
    const { setCurrentUserAsync } = props;
    setCurrentUserAsync();
  }, [])
  return (
    <div className="App">
      <div className="container-fluid">
          <div className="row">
            <Header/>
            <Switch>
              <Route exact path="/" render={() => props.currentUser ? <Homepage/> : <Redirect to="/login" />} />
              <Route path="/login" render={() => props.currentUser ? <Redirect to="/" /> : <Login/>} />
              <Route path="/signup" render={() => props.currentUser ? <Redirect to="/" /> : <SignUp/>} />
              <Route exact path="/profiles" component={Profiles} />
              <Route path="/profiles/:profile_id" component={UserProfile} />
            </Switch> 
            <Notifications />
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUserAsync: () => dispatch(setCurrentUserAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);