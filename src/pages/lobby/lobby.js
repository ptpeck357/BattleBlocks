import React from "react";
import { Redirect } from 'react-router-dom';
import {  Jumbotron, Container } from "reactstrap";
import "./lobby.css";
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
				    <Jumbotron>
				    <div>In each round you will play against one opponent for <strong>BlockCoins and Points</strong></div>
				    <div>Points last forever, BlockCoins do not</div>
				    <hr/>
					    <h3>The Object of Battle Blocks:</h3>
						    <ol>
						    	<li>Clear Blocks From Your Side</li>
						    	<li>Collect BlockCoins</li>
						    	<li>Use BlockCoins to Earn Points</li>
						    </ol>
						<hr/>
							<ul>
								<li>When you have more blocks than your opponent and you click a block, you <i>earn</i> BlockCoins, when you have fewer blocks, you <i>spend</i> BlockCoins</li>
					    		<li>The computer is randomly reducing the number of blocks; whoever clears their last 3 blocks earns points</li>
					    		<li>The game ends when one player clears all their blocks</li>
				    		</ul>
						<br/>				    
				    <Newgame
				    	player={this.state.owner}
				    	score={this.state.score}
						/>
				    </Jumbotron>
				</Container>
			)
		}
	}
}

export default Lobby;
