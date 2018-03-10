import React from "react";
import Leftboard from "../../components/Leftboard";
import Rightboard from "../../components/Rightboard";
import { Container, Row, Col } from "reactstrap";
import Navbar from "../../components/Nav/index";
import { Redirect } from 'react-router-dom';
import fire from "../../fire.js";
import axios from 'axios';

class Gameboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //Game ID
      gameID : "",

      //Game state settings
      player: null, // from user login!
      opponent: "", // from user login!

      headline: "",
      high_side: null,
      boardleader: "",
      leader: 0,

      //Buttons
      leftButtons : "",
      leftboardpts: 1,
      rightButtons : "",
      rightboardpts: 1,
    }
  };

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
  };

  //Get buttons from firebase
  getFirebaseButtons = (gameID) => {
    console.log("gameboard.getFirebaseButtons =>")

    //Synchronize firebase with state 'buttons'
    fire.syncState("Live_Games/"+gameID+'/headline', {
      context: this,
      state: 'headline'
    })

    //Synchronize firebase with state 'buttons'
    fire.syncState("Live_Games/"+gameID+'/high_side', {
      context: this,
      state: 'high_side'
    })

    //Synchronize firebase with state 'buttons'
    fire.syncState("Live_Games/"+gameID+'/boardleader', {
      context: this,
      state: 'boardleader'
    })

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

    //Synchronize firebase with player 2
    fire.syncState("Live_Games/"+gameID+'/user2_name', {
      context: this,
      state: 'opponent'
    })

    //Synchronize firebase with player 1
    fire.syncState("Live_Games/"+gameID+'/user1_name', {
      context: this,
      state: 'player'
    })

//POINTS
		//Synchronize firebase
		fire.syncState("Live_Games/"+gameID+'/user1_points', {
			context: this,
			state: 'leftboardpts'
    })

		//Synchronize firebase
		fire.syncState("Live_Games/"+gameID+'/user2_points', {
			context: this,
			state: 'rightboardpts'
		})
  };

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
      this.setState({leftButtons : "", rightButtons : ""})

    } else if (u2_blocks === 0) {
      this.setState({leftButtons : "", rightButtons : ""})

    } else {
      this.updateLeader(u1_blocks, u2_blocks)
    }
  };

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
  };

  endFirebase = () => {
    fire.remove("Live_Games/"+this.state.gameID, function(err) {
      if(err) {
        console.log("Error deleting firebase end-point")
      }
    })
  };

  endGame = winner => {

    /*Calls mongoDB*/
    axios.post('/api/endgame', {
      owner: this.state.player,
      opponent: this.state.opponent,
      leftboardpts:  this.state.leftboardpts,
      rightboardpts:  this.state.rightboardpts,
      winner: winner
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error);
    });


    console.log("Winner function triggered")
    let name = winner;
    this.setState({
      high_side: "",
      headline: "The game is over",
      boardleader: "The winner is: "+name
    })
  };

// ----------------------- ------------- -----------------------//
// -------------------- Component Lifecycle --------------------//
// ----------------------- ------------- -----------------------//

  //Parse url to get firebase button object
  componentWillMount() {
    this.parseUrl();
  }

  //Remove firebase game data
  componentWillUnmount() {
    this.endFirebase();
    window.location.assign("https://battle-blocks.herokuapp.com");
  };

// ----------------------- ------------- -----------------------//
// ----------------------- Render Logic ------------------------//
// ----------------------- ------------- -----------------------//

  render() {

    if (!this.state.gameID) {
      console.log("gameboard.noGameID => lobby")
      return <Redirect to={{ pathname: "/lobby" }} />
    } else {
      console.log("gameboard.render =>")
      console.log(this.state.gameID)
      return (
        <Container fluid>
        <Navbar
          headline = {this.state.headline}
          href = {"/lobby"}
          navAction = {"Lobby"}
        />
          <Row>
            <h2>{this.state.boardleader}</h2>
          </Row>
          <Row>
            <Col>
              <Leftboard
                leader = {this.state.high_side}
                player = {this.state.player}
                opponent = {this.state.opponent}
                countBlocks = {this.countBlocks}
                high = {this.state.high_side}
                winner = {this.endGame}
              />
            </Col>
            <Col>
              <Rightboard
                leader = {this.state.high_side}
                player = {this.state.opponent}
                opponent = {this.state.player}
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
}

export default Gameboard;