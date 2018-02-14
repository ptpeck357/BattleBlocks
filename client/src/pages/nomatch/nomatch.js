import React from "react";
import {  Jumbotron, Button, Container } from "reactstrap";

const Nomatch = () =>
  <Container fluid>
        <Jumbotron>
          <h1>This is the Nomatch page</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </Jumbotron>
  </Container>;

export default Nomatch;
