import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./pages/registration";
import Lobby from "./pages/lobby";
import Gamepage from "./pages/gamepage";
import Leaderboard from "./pages/leaderboard";
import Nomatch from "./pages/nomatch";

class App extends Component {

  constructor() {
    super()
      this.state = {
        loggedin: null
      };
    };

  componentWillMount(){
		axios.get('/api/').then(response => {
			if(response.data.isAuthenticated === true){
				this.setState({
					loggedin: true
      	})
			} else {
        this.setState({
					loggedin: false
      	});
      };
		});
	};

  render(){

    if(this.state.loggedin === true) {
      return(
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Registration} />
              <Route exact path="/lobby" component={Lobby} />
              <Route exact path="/gameboard/:id" component={Gamepage} />
              <Route exact path="/leaderboard" component={Leaderboard} />
            </Switch>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Registration} />
              <Route exact path="/lobby" component={Lobby} />
              <Route exact path="/gameboard/:id" component={Gamepage} />
              <Route exact path="/leaderboard" component={Leaderboard} />
            </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App;
