import React from "react";
import Squares from "../Squares";
import {  Jumbotron, Button, Container, Row, Col } from "reactstrap";

const Leftboard = () =>
  <Container fluid>
          <h1>This is the Left Side</h1>
          <Squares />
  </Container>;

export default Leftboard;
