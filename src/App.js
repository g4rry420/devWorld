import React,{ useEffect, useRef, lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"
import { connect } from "react-redux"

import "./App.css"
import Header from "./components/header/header.component"
import ErrorBoundary from "./components/error-boundary/error-boundary.component"
import { setCurrentUserAsync } from "./redux/user/user.actions"
import { selectCurrentUser } from "./redux/user/user.selectors"
import Spinner from "./components/spinner/spinner.component"

const Homepage = lazy(() => import("./pages/homepage/homepage.component"));
const Login = lazy(() => import("./components/login/login.component"));
const SignUp = lazy(() => import("./components/signup/signup.component"));
const Profiles = lazy(() => import("./pages/profiles/profiles.component"));
const Notifications = lazy(() => import("./components/notifications/notifications.component"));
const UserProfile = lazy(() => import("./pages/user-profile/user-profile.component"));
const PostComment = lazy(() => import("./pages/post-comment/post-comment.component"));
const Welcome = lazy(() => import("./components/welcome/welcome.component"))

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
            <ErrorBoundary>
              <Header leftHomepageRef={leftHomepageRef} rightHomepageRef={rightHomepageRef} />
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route exact path="/" render={() => props.currentUser ? <Homepage/> : <Welcome/>} />
                  <Route exact path="/post" render={() => props.currentUser ? <Homepage/> : <Redirect to="/post" />} />
                  <Route path="/login" render={() => props.currentUser ? <Redirect to="/post" /> : <Login/>} />
                  <Route path="/signup" render={() => props.currentUser ? <Redirect to="/post" /> : <SignUp/>} />
                  <Route exact path="/profiles" component={Profiles} />
                  <Route path="/profiles/:profile_id" component={UserProfile} />
                  <Route path="/post/:postId" component={PostComment} />
                  <Route component={<Homepage/>} />
                </Switch>
              
              {
                props.currentUser && <Notifications rightHomepageRef={rightHomepageRef} />
              }
              </Suspense>
            </ErrorBoundary>
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