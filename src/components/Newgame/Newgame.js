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

		let newData = {
			id: null,
			user1_userName: null,
			user1_userPoints: null,
			user1_userCoins: null,
			user2_userName: null,
			user2_userPoints: null,
			user2_userCoins: null,
			user1_buttons: leftButtons,
			user2_buttons: rightButtons
		}
		let myRef = fire.ref().push(newData)
		let gameRoute = '/gameboard/' + myRef.key;

		this.setState({
			redirectTo : gameRoute
		});
	}

	// createNewUserInFirebase() {
		//check fire for game with "status: open"

		//if no "status: open":
			//create player1 object with "status: open"
			//create id: key
			//call createButtons(key)
			//push player objects to fire

	startGame = () => {
		this.createGameData()
		console.log("Yah suure, lemme get right on that for ye!")
		//initiate fire
		//create game name
		//add user1 to game
		//
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