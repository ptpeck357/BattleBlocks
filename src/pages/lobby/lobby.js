import React from "react";
import {  Jumbotron, Container } from "reactstrap";
import "./lobby.css";
import Navbar from "../../components/Nav/index";
import Newgame from "../../components/Newgame/index";
import axios from 'axios';

let headline = "Lobby";

class Lobby extends React.Component{

	componentDidMount(){
		axios.get("/api/lobby").then(response => {
			console.log(response)
		});
	};

	render() {
		return (
			<Container fluid>
			    <Navbar headline = {headline}/>
			    <Jumbotron>
			    <div>In each round you will play against one opponent for <strong>BlockCoins and Points</strong></div>
			    <div>Points last forever, BlockCoins do not</div>
			    <hr />
				    <h2>The Object of Battle Blocks:</h2>
					    <ol>
					    	<li>Clear Blocks From Your Side</li>
					    	<li>Collect BlockCoins</li>
					    	<li>Use BlockCoins to Earn Points</li>
					    </ol>
					<hr />
						<ul>
							<li>When you have more blocks than your opponent and you click a block, you <i>earn</i> BlockCoins, when you have fewer blocks, you <i>spend</i> BlockCoins</li>
				    		<li>The computer is randomly reducing the number of blocks; whoever clears their last 3 blocks earns points</li>
				    		<li>The game ends when one player clears all their blocks</li>
			    		</ul>
			    </Jumbotron>
			    <Newgame
					/>
			</Container>
		)
	}
}

export default Lobby;
