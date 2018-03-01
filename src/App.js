import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Registration from "./pages/registration";
import Lobby from "./pages/lobby";
import Gamepage from "./pages/gamepage";
import Leaderboard from "./pages/leaderboard";
import Nomatch from "./pages/nomatch";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )}/>
)

class App extends Component {
  return(){
    return(
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={() => <Registration isAuthenticated={fakeAuth.authenticate}/>}/>
          <PrivateRoute path='/lobby' component={Lobby} />
          <PrivateRoute path='/Gamepage' component={Gamepage} />
          <PrivateRoute path='/leaderboard' component={Leaderboard} />

          {/* <Route component={Nomatch} /> */}
        </Switch>
      </div>
    </Router>
    )
  }
};

export default App;
