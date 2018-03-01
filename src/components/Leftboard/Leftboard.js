import React from "react";
import Squares from "../Squares";
import { Container } from "reactstrap";
import URL from "url-parse";
import fire from "../../fire.js";

class Leftboard extends React.Component {

	// Setups props
	constructor(props) {
		super(props);
		
		this.state = {
			gameID : null,
			buttons : null,
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
		// console.log(gameID);
		this.getFirebaseButtons(gameID);
	}  

	//Get buttons from firebase
	getFirebaseButtons = gameID => {

		//access values in firebase and return snapshot
		fire.ref().on('child_added', snapshot => {

			//access values in snapshot
			let response = snapshot.val();

			//create user button arrays
			let user1_buttons = response.user1_buttons;
			let user2_buttons = response.user2_buttons;
			
			this.setState({
				buttons : user1_buttons, 
				rightButtons : user2_buttons
			})
		})
	};

// ----------------------- ------------- -----------------------//
// ----------------------- click actions -----------------------//
// ----------------------- ------------- -----------------------//

	//The button-click handler
	buttonClick = (id) => { 
		console.log("leftboard.buttonClick fired");

		//Test for legal move
		if (this.props.coins < 1 && this.props.high !== this.props.player) {
			console.log("illegal move - stop!")

		} else {
			console.log("legal move")

		this.changeCoins();
		this.changePoints();
		this.deactivateButton(id);

		//Activate new button 
		this.props.add(this.addButton);
		}
	}

	//Once a button is clicked, this triggers all the changes
	deactivateButton = (id) => {
		console.log("leftboard.deactivateButton fired") 

		//loop through all the buttons
		for (let i=0; i<this.state.buttons.length; i++){

			//if the button exists and is active
			if(this.state.buttons[i].id === id && this.state.buttons[i].active === 1){
				
				//turn off status in state
				this.state.buttons[i].active = 0;

				//turn off status in firebase
				fire.ref(this.state.gameID + "/user1_buttons/" + id).update({active : 0});

				this.reDisplay();
			}
		}
	}

	//Once a button is clicked, this re-displays the "visible" buttons
    reDisplay = () => { 
    	console.log("leftboard.reDisplay fired")

    	//loop through all the buttons
        for (let i=0; i<this.state.buttons.length; i++){

        	//if finds active button 
            if (this.state.buttons[i].active === 1) {

            	//turn button on
                document.getElementById(this.state.buttons[i].id).style.visibility="visible";
            } else {

            	//else turn button off
                document.getElementById(this.state.buttons[i].id).style.visibility="hidden";
            }
        }
    }

    //this changes coins based on player's click position
	changeCoins = () => { 
		let coins = this.props.coins;
		if (this.props.high === this.props.player){
			coins = coins + 1;
			// console.log(coins);
		} else {
			coins = coins - 1;
			// console.log(coins);
		}
		//update props with new coins total
		this.props.leftCoins(coins)
	}

	//this should change points based on player's click position
	changePoints = () => { 
		let points = this.props.points;
		let countActive = 0;
		for (let i=0; i<this.state.buttons.length; i++){
			console.log(this.state.buttons)
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

				// declare winner
				this.props.winner(this.props.player)
				break;
			default:
				points;
		}
		//update props with new points total
		this.props.leftPoints(points)
	}

  	//Activate a random new button
	addButton = () => { 
		console.log("leftboard.addButton fired");
		
		//Pick a random Id that is in the range
		let randomId = Math.floor(Math.random()*this.state.buttons.length)

		//Check if the button is active
		if (this.state.buttons[randomId].active === 0) {
				
				//update state
				this.state.buttons[randomId].active = 1;

				//update firebase
				fire.ref(this.state.gameID + "/user2_buttons/" + randomId).update({active : 1});			
		} 
		this.reDisplay();
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
	       			coordinates = {button.coordinates}
	       			status = {button.active}
	       			buttonClick = {this.buttonClick} 
	       		/>
	        )
	    : ""

	render() {
		return (
		  	<Container fluid>
		        <h2>Player name: {this.props.player}</h2>
		        <h4>$BlockCoins$: {this.props.coins} Total Points: {this.props.points}</h4>		        
				        
		        {this.determineButtonRender()}

		  	</Container>
		)
	}
}

export default Leftboard;

