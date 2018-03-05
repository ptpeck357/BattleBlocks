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
  )} />
)

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const App = () => {

  return(
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/gameboard/:id" component={Gamepage} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route component={Nomatch} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;