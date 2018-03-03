import React from "react";
import { Button } from "reactstrap";
import { Redirect } from 'react-router-dom';
import leftButtons from "../leftbuttons.json";
import rightButtons from "../rightbuttons.json";
import fire from "../../fire.js";

//This component sits in "Lobby" button and initiates a new game
class Newgame extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			redirectTo : null,
		}
	}

	createGameData = () => {

		let myRef = fire.push('Live_Games', { 
			data : { 
				//Gameboard data
				id: null,
				game_status: 'open',
				headline: 'Game is live',
				high_side: 'Click a block to begin',
				boardleader: 'Click a block to begin',

				//Leftboard data
				user1_name: "David",
				user1_points: 1,
				user1_coins: 3,
				user1_buttons: leftButtons,

				//Rightboard data
				user2_name: "Goliath",
				user2_points: 1,
				user2_coins: 3,
				user2_buttons: rightButtons
			}
		});

		let gameRoute = '/gameboard/' + myRef.key;

		this.setState({
			redirectTo : gameRoute
		});
	}

	startGame = () => {
		this.createGameData()
		console.log("Yah suure, lemme get right on that for ye!")
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		else
		{
			return (
				<Button onClick ={this.startGame}>
					Start A Round
				</Button>
			)
		}
	}
}

export default Newgame;