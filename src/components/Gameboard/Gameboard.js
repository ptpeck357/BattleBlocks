import React from "react";
import Leftboard from "../../components/Leftboard";
import Rightboard from "../../components/Rightboard";
import leftButtons from "../leftbuttons.json";
import rightButtons from "../rightbuttons.json";
import {  Jumbotron, Button, Container, Row, Col } from "reactstrap";

class Gameboard extends React.Component {

  constructor(props) {
    super(props);
    this.leftCoins = this.leftCoins.bind(this);
    this.leftPoints = this.leftPoints.bind(this);
    this.rightCoins = this.rightCoins.bind(this);
    this.rightPoints = this.rightPoints.bind(this);
    this.addRightButton = this.addRightButton.bind(this);
    this.addLeftButton = this.addLeftButton.bind(this);
    this.endGame = this.endGame.bind(this);
    this.updateLeader = this.updateLeader.bind(this);
  }

  state = {

    //Game state settings
    player: "David", // from user login!
    opponent: "Goliath", // from user login!
    high_side: "David",
    headline: "Game is live",
    boardleader: "Click a block to begin",
    leader: 0,
   
    //User1 settings
    u1_blockcoin: 0,
    u1_blockcount: 0,
   
    //User2 settings
    u2_blockcoin: 0,
    u2_blockcount: 0,

    //Need from database!!
    u2_points: 2,
    u1_points: 2,
  }

  updateLeader() {
    let leader;

    let leftPlayer = this.state.player;
    let rightPlayer = this.state.opponent;
    let rpBlocks = 0;
    let lpBlocks = 0;

    for (let i=0; i<rightButtons.length; i++){
      if(rightButtons[i].active === 1){
        console.log("WE HAVE CONTACT!")
        rpBlocks = rpBlocks ++
      }
      this.setState({u2_blockcount : rpBlocks})
    }
      return rpBlocks

    for (let i=0; i<leftButtons.length; i++){
      if(leftButtons[i].active === 1){
        lpBlocks = lpBlocks ++
      }
      // console.log(leftPlayer);
      this.setState({u1_blockcount : lpBlocks})
    }
      console.log(this.state.u1_blockcount);

    if (lpBlocks === rpBlocks) {
      leader = "Both";
    }  else 
    if (lpBlocks < rpBlocks) {
      leader = leftPlayer;
    } else {
      leader = rightPlayer;
    }
      console.log(leader);
    this.setState({
      high_side: leader,
      boardleader: leader+" has the most blocks!"})
}

  addRightButton(cb) {
    cb()
    this.updateLeader();
  } 
  addLeftButton(cb) {
    cb()
    this.updateLeader();
  }

  leftCoins(update) {
    let coins = update;
    this.setState({
      u1_blockcoin: coins
    })
  }

  leftPoints(update) {
    let points = update;
    this.setState({
      u1_points: points
    })
  }

  rightCoins(update) {
    let coins = update;
    this.setState({
      u2_blockcoin: coins
    })
  }

  rightPoints(update) {
    let points = update;
    this.setState({
      u2_points: points
    })
  }

  endGame(winner) {
    let name = winner;
    this.setState({
      high_side: "",
      headline: "The game is over",
      boardleader: "The winner is: "+name
    })
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <h1>{this.state.headline}</h1>
        </Row>
        <Row>
          <h2>{this.state.boardleader}</h2>
        </Row>
        <Row>
          <Col>
            <Leftboard 
              add = {this.addRightButton}
              winner = {this.endGame}
              leftCoins = {this.leftCoins}
              leftPoints = {this.leftPoints}
              high = {this.state.high_side}
              player = {this.state.player} 
              coins = {this.state.u1_blockcoin} 
              points = {this.state.u1_points} 
            />
          </Col>
          <Col>
            <Rightboard 
              add = {this.addLeftButton}
              winner = {this.endGame}
              rightCoins = {this.rightCoins}
              rightPoints = {this.rightPoints}
              high = {this.state.high_side}
              player = {this.state.opponent} 
              coins = {this.state.u2_blockcoin} 
              points = {this.state.u2_points} 
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Gameboard;
