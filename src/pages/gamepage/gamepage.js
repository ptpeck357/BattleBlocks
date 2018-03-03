import React from "react";
import Gameboard from "../../components/Gameboard"
import {  Jumbotron, Container } from "reactstrap";

class Gamepage extends React.Component {
	render() {
		return(
			<Container fluid>
				<Jumbotron>
					<Gameboard />
				</Jumbotron>
			</Container>
	)
	}
}

export default Gamepage;
