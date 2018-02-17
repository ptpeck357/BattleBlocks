import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Registration from "./pages/registration";
import Lobby from "./pages/lobby";
import Gamepage from "./pages/gamepage";
import Leaderboard from "./pages/leaderboard";
import Nomatch from "./pages/nomatch";

// import './App.css';

const App = () =>

  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Registration} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/gameboard" component={Gamepage} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route component={Nomatch} />
      </Switch>
    </div>
  </Router>;

export default App;