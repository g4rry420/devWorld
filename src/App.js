import React,{ useEffect } from 'react';
import { Route } from "react-router-dom"
import { connect } from "react-redux"

import Homepage from "./pages/homepage/homepage.component"
import Header from "./components/header/header.component"
import Login from "./components/login/login.component"
import SignUp from "./components/signup/signup.component"
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
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
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