import React from "react";
import { Redirect } from 'react-router-dom';
import {  Jumbotron, Container, Button } from "reactstrap";
import Navbar from "../../components/Nav/index";
import Newgame from "../../components/Newgame/index";
import axios from 'axios';

let headline = "Lobby";

class Lobby extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			owner: null,
			score: null,
			loggedIn: true
		}
	};

	/*Function to handle logout on submit*/
	logout = (event) => {
		event.preventDefault()
		axios.get('/api/logout').then(response => {
			if(response.data.isAuthenticated === false){
				this.setState({
					loggedin: false
      	});
			};
		});
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

	//Sets up the game owner
	componentDidMount(){
		axios.get("/api/lobby").then(response => {
			this.setState({
				owner: response.data.username,
				score: response.data.totalscore
			})
		});
	};

	render() {
		if (this.state.loggedin === false) {
			return <Redirect to={{ pathname: "/" }} />
		} else {
			return (
				<Container fluid>
				    <Navbar
				    	headline = {headline}
				        navClick = {this.logout}
				        navAction = {"Logout"}
				        href = {""}
				    />
				    <br/><br/>
				    <Jumbotron
				    	style={{backgroundColor: '#f2f2f2'}}
				    >
				    <div>In each round you will play against one opponent for <strong>BlockCoins and Points</strong></div>
				    <div>Points last forever, BlockCoins do not</div>
				    <hr/>
					    <h5>The Object:</h5>
						    <ol>
						    	<li>Collect BlockCoins</li>
						    	<li>Use BlockCoins to Earn Points</li>
						    	<li>Clear Your Side First!</li>
						    </ol>
						<hr/>
					    <h5>How it Works:</h5>
							<ul>
								<li>Click blocks to <i>earn</i> or <i>spend</i> BlockCoins</li>
								<li>If you have more blocks than your opponent, you <i>earn</i> BlockCoins</li>
					    		<li>When you think you have enough coins to win, click as fast as you can!</li>
					    		<li>To win, you will have to clear all your blocks</li>
				    		</ul>
						<br/>
				    <Newgame
				    	player={this.state.owner}
				    	score={this.state.score}
						/>
						<Button className="btn-info" href="leaderboard">Leaderboard</Button>
				    </Jumbotron>
				    <Button className="btn btn-danger" href="https://github.com/BattleBlocks/BattleBlocks">Github</Button>
				</Container>
			)
		}
	}
}

export default Lobby;
