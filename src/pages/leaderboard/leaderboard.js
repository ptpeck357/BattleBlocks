import React, { Component } from 'react'
import {  Jumbotron, Button, Container } from "reactstrap"
import axios from 'axios'

import ReactTable from 'react-table'
import { render } from "react-dom";
import "react-table/react-table.css";

const jsonToTable = require('json-to-table');


class Leaderboard extends Component {  
    state = {
      userData:{},
      isMounting: ""
  };
  
    componentDidMount() {
        axios.get('/api/leaderboard').then(
            response => { this.setState({ userData: response, isMounting:true })
              console.log(this.state.userData);
          })
            .catch(err => console.log(err));
        console.log("Component Did Mount");


        }
        
  render() {
    if(this.state.isMounting){
      console.log("Rendering");
      return(
        
          <Container fluid>
              <h1 className="header">Leaderboard</h1>
              <h1 className="header">
                  Value:  {this.state.userData.data[0].joindate}
              </h1>
                 
            
                  <div>
                <ReactTable
                  data={this.state.userData.data}
                  columns={[
                    {
                      columns: [
                        {
                          Header: "Join Date",
                          accessor: "joindate"
                        },
                        {
                          Header: "User Name",
                          id: "username",
                          accessor: d => d.username
                        },
                        {
                          Header: "Wins",
                          accessor: "wins"
                        },
                        {
                          Header: "Losses",
                          accessor: "losses"
                        },
                        {
                          Header: "Total Score",
                          accessor: "totalScore"
                        }
                      ]
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
                <br />
               
              </div>
            </Container> 
      
      )
    }
    else{
      return(
            <h1 className="header">
                  Loading ...
              </h1>
      )
    }
  } 
}

export default Leaderboard

