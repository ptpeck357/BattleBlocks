import React from "react";
import Squares from "../Squares";
import { Container } from "reactstrap";
import URL from "url-parse";
import fire from "../../fire.js";

class Leftboard extends React.Component {

	// Setups props
	constructor(props) {
		super(props);
		this.buttonClick = this.buttonClick.bind(this);
		this.parseUrl = this.parseUrl.bind(this);
		this.getFirebaseButtons = this.getFirebaseButtons.bind(this);
		this.addButton = this.addButton.bind(this);
		
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

			console.log(user1_buttons)
			console.log(user2_buttons)
			
			this.setState({buttons : user1_buttons, rightButtons : user2_buttons})
		})
	};

// ----------------------- ------------- -----------------------//
// ----------------------- click actions -----------------------//
// ----------------------- ------------- -----------------------//

	//The button-click handler
	buttonClick = (status, id) => { 
		console.log("leftboard.buttonClick fired");

		if (this.props.coins < 1 && this.props.high !== this.props.player) {
			console.log("illegal move - stop!")

		} else {
			console.log("legal move")
		this.changeActive(status, id);
		this.props.add(this.addButton);
		}
	}

	//Once a button is clicked, this triggers all the changes
	changeActive = (status, id) => {
		console.log("leftboard.changeActive fired") 
		for (let i=0; i<this.state.buttons.length; i++){
			if(this.state.buttons[i].id === id && this.state.buttons[i].active === 1){
				this.state.buttons[i].active = 0;

				//need to update firebase with new status
				fire.ref(this.state.gameID + "/user1_buttons/" + id).update({active : 1});

				this.reDisplay(status, id);
				this.changeCoin();
				this.changePoints();
			}
		}
	}

	//Once a button is clicked, this re-displays the "visible" buttons
    reDisplay = (status, id) => { 
    	console.log("leftboard.reDisplay fired")
        for (let i=0; i<this.state.buttons.length; i++){
            if (this.state.buttons[i].active === 1) {
                document.getElementById(this.state.buttons[i].id).style.visibility="visible";
            } else {
                document.getElementById(this.state.buttons[i].id).style.visibility="hidden";
            }
        }
    }

    //this changes coins based on player's click position
	changeCoin = () => { 
		let coins = this.props.coins;
		if (this.props.high === this.props.player){
			coins = coins + 1;
			// console.log(coins);
		} else {
			coins = coins - 1;
			// console.log(coins);
		}
		this.props.leftCoins(coins)
	}

	//this should change points based on player's click position
	changePoints = () => { 
		let points = this.props.points;
		let countActive = 0;
		for (let i=0; i<this.state.buttons.length; i++){
			if(this.state.buttons[i].active === 1) {
				countActive = countActive + 1;
			}
		}

		// update points
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

		this.props.leftPoints(points)
	}

  	//This should randomly activate a new button
	addButton() { 
		let randomId = Math.floor(Math.random()*this.state.rightButtons.length)

		console.log("leftboard.addButton fired");
	
		if (this.state.rightButtons[randomId].active === 0) {
				//update firebase
				fire.ref(this.state.gameID + "/user2_buttons/" + randomId).update({active : 1});
			
			//turn new button to 'visible'
			document.getElementById(this.state.rightButtons[randomId].id).style.visibility="visible";
		} 
	}	

// ----------------------- ------------- -----------------------//
// -------------------- Component Lifecycle --------------------//
// ----------------------- ------------- -----------------------//

	componentWillMount() {
		this.parseUrl();
	}

	componentDidMount() {
		fire.ref(this.state.gameID).on('child_changed', (childSnapshot, prevChildKey) => {
			
			console.log(childSnapshot.val());
		this.setState({rightButtons : childSnapshot.val()})
		});
	}

	componentDidUpdate() {
		if (this.state.buttons === null) {
			console.log("HELP BUTTONS ARE NULL")
		} else {
			console.log("Buttons are not null --- stiill help")
		    for (let i=0; i<this.state.buttons.length; i++){
		        if (this.state.buttons[i].active === 1) {
		            document.getElementById(this.state.buttons[i].id).style.visibility="visible";
		        } else {
		            document.getElementById(this.state.buttons[i].id).style.visibility="hidden";
		        }
		    } 
		}
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

