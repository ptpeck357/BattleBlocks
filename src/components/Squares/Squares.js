import React from "react";
import buttons from "../buttons.json";
import {  Jumbotron, Button, Container, Row, Col } from "reactstrap";

const styles = {
  cardStyle: {
    background: "#082c6d",
    color: "white",
    width: "40px",
    height: "40px",
    position: "relative",
    margin: "2px",
    boxShadow: "1px 1px 1px -1px rgb(8,19,40)"
  }
};

class Squares extends React.Component {

     constructor(props){
          super(props);
     }

     state = {
          buttons
     }

     //only active buttons are made visible
     componentDidMount(status, id) { 

          //Randomizes the button activation
          let currentIndex = buttons.length, temporaryValue, randomIndex;
          while (0 !== currentIndex) {
               randomIndex = Math.floor(Math.random() * currentIndex);
               currentIndex -= 1;
               temporaryValue = buttons[currentIndex];
               buttons[currentIndex] = buttons[randomIndex];
               buttons[randomIndex] = temporaryValue;
          }
          return buttons;

          //Displays the active buttons
          for (let i=0; i<buttons.length; i++){
               if (buttons[i].active === 1) {
                    document.getElementById(buttons[i].id).style.visibility="visible";
               } else {
                    document.getElementById(buttons[i].id).style.visibility="hidden";
               }
          }
     }

     render() {
          return (
               <Button 
                    status={this.props.status}
                    style={styles.cardStyle}
                    id={this.props.id} 
                    onClick={() => this.props.buttonClick(this.props.status, this.props.id)}
                    >
               </Button>
          );
     }
}

export default Squares;