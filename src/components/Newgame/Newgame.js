import React from "react";
import {  Jumbotron, Button, Container } from "reactstrap";
import Navbar from "../../components/Nav/index";
import axios from "axios";
import leftButtons from "../leftbuttons.json";
import rightButtons from "../rightbuttons.json";
import fire from "../../fire.js"

//This component sits in "Lobby" button and initiates a new game
class Newgame extends React.Component {

	constructor(props){
		super(props);
		this.startGame = this.startGame.bind(this);
		this.createGameData = this.createGameData.bind(this);
	}

	// state = {
	// 	user1_userName : null,
	// 	user2_userName: null,
	// 	user1_points: null,
	// 	user2_points: null,
	// 	user1_buttons: null,
	// 	user2_buttons: null
	// }

	createGameData() {
		axios.get('/api/lobby/newgame').then(response => {
   		console.log(response.data)
   
		})

		let myRef = fire.ref().push();
		let key = myRef.key;

		let newData = {
			id: key,
			user1_userName: null,
			user1_userPoints: null,
			user1_userCoins: null,
			user2_userName: null,
			user2_userPoints: null,
			user2_userCoins: null,
			user1_buttons: leftButtons,
			user2_buttons: rightButtons
		}
		console.log(newData);
		myRef.push(newData)
	}

	createNewUserInFirebase() {
		//check fire for game with "status: open"
		
		//if no "status: open": 
			//create player1 object with "status: open"
			//create id: key
			//call createButtons(key)
			//push player objects to fire

		//if "status: open" is found:
			//assign player1 data to object
			//push player object to game
			//change status to "closed"
	}


	startGame() {
		this.createGameData()
		console.log("Yah suure, lemme get right on that for ye!")
		//initiate fire
		//create game name
		//add user1 to game
		//
	}

	render() {
		return (
			<Button onClick ={this.startGame}>
				Start A Round
			</Button>
		)
	}
}

export default Newgame;