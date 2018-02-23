import React from "react";
import {  Jumbotron, Button, Container } from "reactstrap";
import Navbar from "../../components/Nav/index";

//This component sits in "Lobby" button and initiates a new game
class Newgame extends React.Component {

	constructor(props){
		super(props);
		this.startGame = this.startGame.bind(this);
	}

	startGame() {
		console.log("Yah suure, lemme get right on that for ye!")
		//initiate firebase
		//create game name
		//add user1 to game
		//
	}

	render() {
		return (
			<Button href="gameboard" onClick ={this.startGame}>
				Start A Round
			</Button>
		)
	}
}

export default Newgame;