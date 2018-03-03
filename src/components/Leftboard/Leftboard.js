import React from "react";
import Squares from "../Squares";
import { Container } from "reactstrap";
import URL from "url-parse";
import fire from "../../fire.js";

class Leftboard extends React.Component {

	// Setups props
	constructor(props) {
		super(props);

		//Initiate the state variables
		this.state = {
			gameID : null,
			buttons : null,
			user1_coins: 3,
			user1_points: 1,
			rightButtons : null
		}
	}

// ----------------------- ------------- -----------------------//
// --------------------------- SETUP ---------------------------//
// ----------------------- ------------- -----------------------//

	//Captures the gameID from the url
    parseUrl = () => {
		let gameUrl = window.location.href;
		let path = new URL(gameUrl);

		let gameID = path.pathname.slice(11);

		this.setState({
			gameID : gameID
		})
		this.syncFirebase(gameID);
	}  

	//Sync firebase with state
	syncFirebase = (gameID) => {

//BUTTONS
		//Synchronize firebase with state 'leftButtons'
		fire.syncState("Live_Games/"+gameID+'/user1_buttons', {
			context: this,
			state: 'buttons',
			asArray: true
		})

		//Synchronize firebase with state 'buttons'
		fire.syncState("Live_Games/"+gameID+'/user2_buttons', {
			context: this,
			state: 'rightButtons',
			asArray: true
		})

//COINS
		//Synchronize firebase 
		fire.syncState("Live_Games/"+gameID+'/user1_coins', {
			context: this,
			state: 'user1_coins'
		})

//POINTS
		//Synchronize firebase 
		fire.syncState("Live_Games/"+gameID+'/user1_points', {
			context: this,
			state: 'user1_points'
		})

	}

// ----------------------- ------------- -----------------------//
// ----------------------- click actions -----------------------//
// ----------------------- ------------- -----------------------//

	//Checks for legal move
	buttonClick = (id) => { 

		//Test for legal move
		if (this.state.user1_coins < 1 && this.props.high !== this.props.player) {
			console.log("illegal move - stop!")

		} else {
			console.log("legal move")

		this.changeButtonStatus(id);
		}
	}

	//Handles the updates
	async changeButtonStatus(id) {
		await this.deactivateButton(id)
		await this.addButton()
		this.changeCoins();
		this.changePoints()
		this.props.countBlocks()
	}

	//This turns the button off and updates state
	deactivateButton = (id) => { 
		
		let buttons = this.state.buttons;

		//loop through all the buttons
		for (let i=0; i<buttons.length; i++){

			//if the button exists and is active
			if(buttons[i].id === id && buttons[i].active === 1){
				
				buttons[i].active = 0

				this.setState({
					buttons: buttons

				})	
			}
		}
	}

  	//This activates a random opponent button
	addButton = () => { 
		
		let rightButtons = this.state.rightButtons;
		let randomId = Math.floor(Math.random()*this.state.buttons.length)

		if (rightButtons[randomId].active === 0) {
			rightButtons[randomId].active = 1

			this.setState({
				rightButtons: rightButtons
			})
		}
	}

    //This changes coins based on player's click position
	changeCoins = () => { 
		let coins = this.state.user1_coins;
		if (this.props.high === this.props.player){
			coins = coins + 1;
			// console.log(coins);
		} else {
			coins = coins - 1;
			// console.log(coins);
		}
		//update state with new coins total
		this.setState({
			user1_coins: coins
		})
	}

	//This changes points based on player's click position
	changePoints = () => { 
		let points = this.state.user1_points;
		let countActive = 0;
		for (let i=0; i<this.state.buttons.length; i++){
			if(this.state.buttons[i].active === 1) {
				countActive = countActive + 1;
			}
		}

		//calculate the new point total
		switch (countActive) {
			case 2:
				points = points + 1
				break;
			case 1:
				points = points + 2
				break;
			case 0:
				points = points + 3

				console.log("Leftboard wins")
				// declare winner
				this.props.winner(this.props.player)
				break;
			default:
				points;
		}
		//update props with new points total
		this.setState({
			user1_points: points
		})
	}

// ----------------------- ------------- -----------------------//
// -------------------- Component Lifecycle --------------------//
// ----------------------- ------------- -----------------------//

	componentWillMount() {
		this.parseUrl();
	}

// ----------------------- ------------- -----------------------//
// ----------------------- Render Logic ------------------------//
// ----------------------- ------------- -----------------------//

	determineButtonRender = () =>
	    !(this.state.buttons === null) ?
	        this.state.buttons.map((button, i) =>
	       		<Squares
	       			key = {i}
	       			id = {button.id}
	       			side = {button.side}
	       			status = {button.active}
	       			buttonClick = {this.buttonClick}
	       		/>
	        )
	    : ""
	//Render to Dom
	render() {
		return (
		  	<Container fluid>
		        <h2>Player name: {this.props.player}</h2>
		        <h4>$BlockCoins$: {this.state.user1_coins} Total Points: {this.state.user1_points}</h4>		        

		        {this.determineButtonRender()}

		  	</Container>
		)
	}
}

export default Leftboard;