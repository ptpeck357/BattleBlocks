import React from "react";
import Leftboard from "../../components/Leftboard";
import Rightboard from "../../components/Rightboard";
import { Container, Row, Col } from "reactstrap";
import Navbar from "../../components/Nav/index";
import fire from "../../fire.js";

class Gameboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //Game state settings
      player: "David", // from user login!
      opponent: "Goliath", // from user login!
      high_side: "David",
      headline: "Game is live",
      boardleader: "Click a block to begin",
      leader: 0,

      //Buttons
      leftButtons : "",
      rightButtons : "",

      //Game ID
      gameID : "",
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
    this.getFirebaseButtons(gameID);
  }  

  //Get buttons from firebase
  getFirebaseButtons = (gameID) => {
    
    //Synchronize firebase with state 'leftButtons'
    fire.syncState("Live_Games/"+gameID+'/user1_buttons', {
      context: this,
      state: 'leftButtons'
    })

    //Synchronize firebase with state 'buttons'
    fire.syncState("Live_Games/"+gameID+'/user2_buttons', {
      context: this,
      state: 'rightButtons'
    })
  }

// ----------------------- ------------- -----------------------//
// ----------------------- Click Actions -----------------------//
// ----------------------- ------------- -----------------------//

  //Checks who is the boardleader
  countBlocks = () => {
    console.log("gameboard.countBlocks =>");

    let u2_blocks = 0;
    let u1_blocks = 0;

    for (let i=0; i<this.state.rightButtons.length; i++){
      if(this.state.rightButtons[i].active === 1){
        u2_blocks = u2_blocks + 1
      }
    }
    this.setState({u2_blockcount : u2_blocks})

    for (let i=0; i<this.state.leftButtons.length; i++){
      if(this.state.leftButtons[i].active === 1){
        u1_blocks = u1_blocks + 1
      }
    }
    this.setState({u1_blockcount : u1_blocks})

    if (u1_blocks === 0) {
      this.endGame(this.state.player)
      this.setState({leftButtons : "", rightButtons : ""})

    } else if (u2_blocks === 0) {
      this.endGame(this.state.opponent)
      this.setState({leftButtons : "", rightButtons : ""})
    
    } else {
      this.updateLeader(u1_blocks, u2_blocks)
    }
  }

  //Updates the boardleader based on countBlocks()
  updateLeader = (u1_blocks, u2_blocks) => {
    let leader = "Neither"

    if (u1_blocks === u2_blocks) {
      this.setState({boardleader: "Both players are equal"});
    }  else
    if (u1_blocks < u2_blocks) {
      leader = this.state.opponent;
    } else {
      leader = this.state.player;
    }
    this.setState({
      high_side: leader,
      boardleader: leader+" has the most blocks!"})
  }

  endGame = winner => {
    console.log("Winner function triggered")
    let name = winner;
    this.setState({
      high_side: "",
      headline: "The game is over",
      boardleader: "The winner is: "+name
    })
  }

// ----------------------- ------------- -----------------------//
// -------------------- Component Lifecycle --------------------//
// ----------------------- ------------- -----------------------//

  //Get button object from firebase
  componentWillMount() {
    this.parseUrl();
  }

// ----------------------- ------------- -----------------------//
// ----------------------- Render Logic ------------------------//
// ----------------------- ------------- -----------------------//

  render() {
    return (
      <Container fluid>
      <Navbar headline = {this.state.headline}/>
        <Row>
          <h2>{this.state.boardleader}</h2>
        </Row>
        <Row>
          <Col>
            <Leftboard
              player = {this.state.player}
              countBlocks = {this.countBlocks}
              high = {this.state.high_side}
              winner = {this.endGame}
            />
          </Col>
          <Col>
            <Rightboard
              player = {this.state.opponent}
              countBlocks = {this.countBlocks}
              high = {this.state.high_side}
              winner = {this.endGame}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Gameboard;