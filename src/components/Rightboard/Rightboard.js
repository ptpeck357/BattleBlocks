import React from "react";
import Squares from "../Squares";
import buttons from "../rightbuttons.json";
import leftButtons from "../buttons.json";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";

class Rightboard extends React.Component {

	// Setups props
	constructor(props) {
		super(props);
		this.buttonClick = this.buttonClick.bind(this);
	}

	// Initiate state
	state = {
		buttons
	}

	// shuffles the buttons
	shuffle() { 
    let currentIndex = buttons.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = buttons[currentIndex];
      buttons[currentIndex] = buttons[randomIndex];
      buttons[randomIndex] = temporaryValue;
    }
    return buttons;
  	} 

  	//This should randomly activate a new button
	addRightButton() { 
		let randomId = Math.floor(Math.random()*leftButtons.length)
		console.log(randomId);
	
		if (leftButtons[randomId].active === 0) {
			leftButtons[randomId].active = 1;
			document.getElementById(leftButtons[randomId].id).style.visibility="visible";
		} 
	}

	//Once a button is clicked, this triggers all the changes
	changeActive(status, id) { 
		for (let i=0; i<buttons.length; i++){
			if(buttons[i].id === id && buttons[i].active === 1){
				buttons[i].active=0;
				this.reDisplay(status, id);
				this.changeCoin();
				this.changePoints();
			}
		}
	}

	//Once a button is clicked, this re-displays the "visible" buttons
    reDisplay(status, id) { 
          for (let i=0; i<buttons.length; i++){
               if (buttons[i].active === 1) {
                    document.getElementById(buttons[i].id).style.visibility="visible";
               } else {
                    document.getElementById(buttons[i].id).style.visibility="hidden";
               }
          }
     }

    //this changes coins based on player's click position
	changeCoin() { 
		let coins = this.props.coins;
		if (this.props.high === this.props.player){
			coins = coins + 1;
			// console.log(coins);
		} else {
			coins = coins - 1;
			// console.log(coins);
		}
		this.props.rightCoins(coins)
	}

	//this should change points based on player's click position
	changePoints() { 
		let points = this.props.points;
		let countActive = 0;
		for (let i=0; i<buttons.length; i++){
			if(buttons[i].active === 1) {
				countActive = countActive + 1;
			}
		}
		// console.log(points);

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
		// console.log(points);
		this.props.rightPoints(points)
	}

	//this is the button click handler
	buttonClick(status, id) { 
		this.changeActive(status, id);
		this.props.add(this.addRightButton);

		console.log(buttons);
	}

	render() {
		return (
		  	<Container fluid>
		        <h2>Player name: {this.props.player}</h2>
		        <h4>$BlockCoins$: {this.props.coins} Total Points: {this.props.points}</h4>		        
		        {this.state.buttons.map(button => (
		       		<Squares 
		       			id = {button.id}
		       			coordinates = {button.coordinates}
		       			status = {button.active}
		       			buttonClick = {this.buttonClick} 
		       		/>
		        ))}
		  	</Container>
		)
	}
}

export default Rightboard;

