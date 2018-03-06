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
			redirectTo : null
		}
	};

	//Creates brand new game
	createGameData = () => {

		let myRef = fire.push('Live_Games', {
			data : {
				//Gameboard data
				id: null,
				owner: this.props.player,
				game_status: 'open',
				headline: 'Game is live',
				high_side: 'Click a block to begin',
				boardleader: 'Click a block to begin',

				//Leftboard data
				user1_name: this.props.player,
				user1_points: this.props.score,
				user1_coins: 3,
				user1_buttons: leftButtons,

				//Rightboard data
				user2_name: "Goliath",
				user2_points: "player 2 points",
				user2_coins: 3,
				user2_buttons: rightButtons
			}
		});

		let gameRoute = '/gameboard/' + myRef.key;

		this.setState({
			redirectTo : gameRoute
		});
	}

	//Checks for available game - if no game - calls "createGameData"
	joinGame = () => {
		fire.fetch('Live_Games',{
			context: this,
			asArray: true,
			then(data){
				if(data.length === 0){
					this.createGameData();
				}
				for (let i = 0; i < data.length; i++){
					console.log(i);
					if(data[i].game_status === "open"){
						console.log(this.props.player)
						fire.update('Live_Games/' + data[i].key,{
							data: {
								game_status: "closed",
								user2_name: this.props.player,
								user2_points: this.props.score
							}
						});
						let gameRoute = '/gameboard/' + data[i].key;
						this.setState({
							redirectTo : gameRoute
						});
						break;
					} else if(i === data.length-1){
						this.createGameData();
					}
				}
			}
		});
	};

	//Click initiates a start game
	startGame = () => {
  	this.joinGame();
		console.log("Yah suure, lemme get right on that for ye!")
	};

	render(){

		if(this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<Button 
					className="btn btn-success"
					onClick ={this.startGame}>
					Start A Round
				</Button>
			)
		}
	};
};

export default Newgame;
