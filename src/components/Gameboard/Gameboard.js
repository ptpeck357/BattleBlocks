import React from "react";
import Leftboard from "../../components/Leftboard";
import Rightboard from "../../components/Rightboard";
import {  Jumbotron, Button, Container, Row, Col } from "reactstrap";

const Gameboard = () =>
  <Container fluid>
        <Row>
          <h1>This is the Gameboard</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </Row>
        <Row>
          <Col><Leftboard /></Col>
          <Col><Rightboard /></Col>
        </Row>
  </Container>;

export default Gameboard;
