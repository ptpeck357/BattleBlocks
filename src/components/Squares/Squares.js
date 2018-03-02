import React from "react";
import { Container, Button } from "reactstrap";


class Squares extends React.Component {
  
  render() {
    return (
      <Button 
        style={{ 
          visibility: this.props.status == 1? 'visible': 'hidden',
          background: "#082c6d",
          color: "white",
          width: "40px",
          height: "40px",
          position: "relative",
          margin: "2px",
          boxShadow: "1px 1px 1px -1px rgb(8,19,40)"
        }}
        onClick={() => this.props.buttonClick(this.props.id, this.props.side)}
      />      
    );
  }
}

export default Squares;