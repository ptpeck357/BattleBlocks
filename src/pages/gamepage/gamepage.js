import React from "react";
import Gameboard from "../../components/Gameboard"
import {  Jumbotron, Button, Container, Row, Col } from "reactstrap";

const Gamepage = () =>
  <Container fluid>
        <Jumbotron>
          <Gameboard />
        </Jumbotron>
  </Container>;

export default Gamepage;
