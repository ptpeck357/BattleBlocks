import React from "react";
import {  Button } from "reactstrap";

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

     render() {
          return (
               <Button 
                    style={styles.cardStyle}
                    id={this.props.id} 
                    onClick={() => this.props.buttonClick(this.props.id)}
                    >
               </Button>
          );
     }
}

export default Squares;