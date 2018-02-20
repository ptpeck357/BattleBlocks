import React from "react";
import Leftboard from "../../components/Leftboard";
import Rightboard from "../../components/Rightboard";
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
  }

  state = {

    //Game state settings
    player: "David", // from user login!
    opponent: "Goliath", // from user login!
    high_side: "David",
    headline: "Game is live",
    boardleader: "David"+" has the least blocks",
   
    //User1 settings
    u1_blockcoin: 3,
    u1_blockcount: 7,
   
    //User2 settings
    u2_blockcoin: 0,
    u2_blockcount: 6,

    //Need from database!!
    u2_points: 7,
    u1_points: 9,
  }

  addRightButton() {
    
  } 
  addLeftButton() {

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
