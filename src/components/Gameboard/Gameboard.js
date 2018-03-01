import React from "react";
import Leftboard from "../../components/Leftboard";
import Rightboard from "../../components/Rightboard";
// import leftButtons from "../leftbuttons.json";
// import rightButtons from "../rightbuttons.json";
import { Container, Row, Col } from "reactstrap";
import Navbar from "../../components/Nav/index";
import fire from "../../fire.js";

class Gameboard extends React.Component {

  constructor(props) {
    super(props);
    this.countBlocks = this.countBlocks.bind(this);

    this.state = {
      //Game state settings
      player: "David", // from user login!
      opponent: "Goliath", // from user login!
      high_side: "David",
      headline: "Game is live",
      boardleader: "Click a block to begin",
      leader: 0,

      //Need from database!!
      u2_points: 2,
      u1_points: 2,
     
      //User1 settings
      u1_blockcoin: 3,
      u1_blockcount: 0,
     
      //User2 settings
      u2_blockcoin: 3,
      u2_blockcount: 0,

      //Buttons
      rightButtons : "",
      leftButtons : "",

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
    console.log(gameID);
  }  

// ----------------------- ------------- -----------------------//
// ----------------------- Click Actions -----------------------//
// ----------------------- ------------- -----------------------//

  //Checks who is the boardleader
  countBlocks = () => {
    let u2_blocks = 0;
    let u1_blocks = 0;

    console.log("gameboard.countBlocks fired");

    for (let i=0; i<this.state.rightButtons.length; i++){
      if(this.state.rightButtons[i].active === 1){
        console.log("WE HAVE CONTACT!")
        u2_blocks = u2_blocks + 1
      }
      this.setState({u2_blockcount : u2_blocks})
    }

    for (let i=0; i<this.state.leftButtons.length; i++){
      if(this.state.leftButtons[i].active === 1){
        u1_blocks = u1_blocks + 1
      }
      // console.log(leftPlayer);
      this.setState({u1_blockcount : u1_blocks})
    }
      console.log(this.state.u1_blockcount);

    this.updateLeader(u1_blocks, u2_blocks)
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

  addRightButton(cb) {
    cb()
    console.log("gameboard.addRightButton fired")
    this.countBlocks;
  } 

  addLeftButton(cb) {
    cb()
    console.log("gameboard.addLeftButton fired")
    this.countBlocks;
  }

  leftCoins = update => {
    let coins = update;
    this.setState({
      u1_blockcoin: coins
    })
  }

  leftPoints = update => {
    let points = update;
    this.setState({
      u1_points: points
    })
  }

  rightCoins = update => {
    let coins = update;
    this.setState({
      u2_blockcoin: coins
    })
  }

  rightPoints = update => {
    let points = update;
    this.setState({
      u2_points: points
    })
  }

  endGame = winner => {
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
    //access values in firebase and return snapshot

  componentDidMount() {
    fire.ref(this.state.gameID).on('child_added', snapshot => {

      //access values in snapshot
      let response = snapshot.val();

      console.log(response);

      //create user button arrays
      let user1_buttons = response.user1_buttons;
      let user2_buttons = response.user2_buttons;

      console.log(user1_buttons)
      console.log(user2_buttons)
      
      this.setState({leftButtons : user1_buttons, rightButtons : user2_buttons})
    })
  };


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
