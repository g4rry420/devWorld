import React,{ useEffect, useRef } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"
import { connect } from "react-redux"

import "./App.css"
import Homepage from "./pages/homepage/homepage.component"
import Header from "./components/header/header.component"
import Login from "./components/login/login.component"
import SignUp from "./components/signup/signup.component"
import Profiles from "./pages/profiles/profiles.component"
import Notifications from "./components/notifications/notifications.component"
import UserProfile from "./pages/user-profile/user-profile.component"
import PostComment from './pages/post-comment/post-comment.component';
import { setCurrentUserAsync } from "./redux/user/user.actions"
import { selectCurrentUser } from "./redux/user/user.selectors"

function App(props) {
  const leftHomepageRef = useRef();
  const rightHomepageRef = useRef();

  useEffect(() => {
    const { setCurrentUserAsync } = props;
    setCurrentUserAsync();
  }, [props.currentUserDependency])

  const handleLeftToggle = () => {
    leftHomepageRef.current.classList.toggle("active-left-homepage");
  }

  const handleRightToggle = () => {
    rightHomepageRef.current.classList.toggle("active-right-homepage");
  }

  return (
    <div className="App">
      <div className="container-fluid">
          <div className="side-icon" >
            <svg onClick={handleLeftToggle} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-filter-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
            {
              props.currentUser && (
                <svg onClick={handleRightToggle} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-filter-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"/>
                </svg>
              )
            }
          </div>
          <div className="row">
            <Header leftHomepageRef={leftHomepageRef} rightHomepageRef={rightHomepageRef} />
            <Switch>
              <Route exact path="/" render={() => props.currentUser ? <Homepage/> : <Redirect to="/login" />} />
              <Route path="/login" render={() => props.currentUser ? <Redirect to="/" /> : <Login/>} />
              <Route path="/signup" render={() => props.currentUser ? <Redirect to="/" /> : <SignUp/>} />
              <Route exact path="/profiles" component={Profiles} />
              <Route path="/profiles/:profile_id" component={UserProfile} />
              <Route path="/post/:postId" component={PostComment} />
            </Switch>
            {
              props.currentUser && <Notifications rightHomepageRef={rightHomepageRef} />
            }
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  currentUserDependency: state.user.currentUserDependency
})

const mapDispatchToProps = dispatch => ({
  setCurrentUserAsync: () => dispatch(setCurrentUserAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);