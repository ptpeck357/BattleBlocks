import React from "react";
import Squares from "../Squares";
import { Container } from "reactstrap";
import URL from "url-parse";
import fire from "../../fire.js";
import axios from 'axios';

class Leftboard extends React.Component {

	// Setups props
	constructor(props) {
		super(props);

		//Initiate the state variables
		this.state = {
			Mongo_owner: null,
			Game_owner: null,
			gameID : null,
			buttons : null,
			user1_name: null,
			user1_coins: 3,
			user1_points: 1,
			rightButtons : null,
			opponent: null
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
	};

	//Sync firebase with state
	syncFirebase = (gameID) => {
//GAME_OWNER
		//Synchronize firebase with state 'leftButtons'
		fire.syncState("Live_Games/"+gameID+'/owner', {
			context: this,
			state: 'Game_owner'
		})

//USER
		//Synchronize firebase with state 'leftButtons'
		fire.syncState("Live_Games/"+gameID+'/user1_name', {
			context: this,
			state: 'user1_name'
		})

//OPPONENT
		//Synchronize firebase with state 'leftButtons'
		fire.syncState("Live_Games/"+gameID+'/user2_name', {
			context: this,
			state: 'opponent'
		})

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
	};

// ----------------------- ------------- -----------------------//
// ----------------------- click actions -----------------------//
// ----------------------- ------------- -----------------------//

	//Checks for legal move
	buttonClick = (id) => {

		//Test for opponent
		if (!this.state.opponent) {
			return;
		}
		//Test for side
		else if (this.state.Mongo_owner !== this.state.Game_owner) {
			console.log("illegal move - wrong side!")
		}
		//Test for coins
		else if (this.state.user1_coins < 1 && this.props.high !== this.props.player) {
			console.log("illegal move - not enough coins")
		//Allow move
		} else {
			console.log("legal move")
			this.changeButtonStatus(id);
		}
	};

	//Handles the updates
	async changeButtonStatus(id) {
		await this.deactivateButton(id)
		await this.addButton()
		this.changeCoins();
		this.changePoints()
		this.props.countBlocks()
	};

	//This turns the button off and updates state
	deactivateButton = (id) => {

		//loop through all the buttons
		let buttons = this.state.buttons;
		for (let i=0; i<buttons.length; i++){

			//if the button exists and is active
			if(buttons[i].id === id && buttons[i].active === 1){

				buttons[i].active = 0

				this.setState({
					buttons: buttons
				})
			}
		}
	};

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
	};

  //This changes coins based on player's click position
	changeCoins = () => {
		let coins = this.state.user1_coins;
		if (this.props.high === this.props.player){
			coins = coins + 1;

		} else {
			coins = coins - 1;

		}
		//update state with new coins total
		this.setState({
			user1_coins: coins
		})
	};

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

				//declare if winner
				this.props.winner(this.props.player)
				break;
			default:
				points;
		};

		//update props with new points total
		this.setState({
			user1_points: points
		})
	};

	identifyPlayer = () => {
		axios.get("/api/lobby").then(response => {
			console.log(response)
			this.setState({
				Mongo_owner: response.data.username
			})
		});
	};

// ----------------------- ------------- -----------------------//
// -------------------- Component Lifecycle --------------------//
// ----------------------- ------------- -----------------------//

	componentWillMount() {
		this.parseUrl();
		this.identifyPlayer();
	};

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
				<h3>Host: {this.state.user1_name}</h3>
					<h4>
						<a
							style={{
								color: (this.props.leader === this.state.Mongo_owner) ? 'green' : 'red' ,
							}}
						>$BlockCoins$: {this.state.user1_coins}
						</a>

						<a> Points: {this.state.user1_points}</a>
					</h4>

				{this.determineButtonRender()}

			</Container>
		)
	};
};

export default Leftboard;
