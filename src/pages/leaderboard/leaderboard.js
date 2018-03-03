import React, { Component } from 'react'  
import {  Jumbotron, Button, Container } from "reactstrap"
import axios from 'axios'
//import styles from "./leaderboard.css"
import ReactTable from 'react-table'
import { render } from "react-dom";
import "react-table/react-table.css";


// leaderboard class with the userData and isMounting variable to render the data
class Leaderboard extends Component {  
    state = {
      userData:{},
      isMounting: ""
  };
  
  // making axios call and getting response from api.js
  // response comes from the database, then setting up the state
    componentDidMount() {
        axios.get('/api/leaderboard').then(
            response => { this.setState({ userData: response, isMounting:true })
              console.log(this.state.userData);
          })
            .catch(err => console.log(err));
        }
 // rendering the data in a react table        
  render() {
              const id =1;

    if(this.state.isMounting){
      return(
        <Container fluid>
          <h1 className="header">Leaderboard</h1>
          <div>
            <ReactTable
              data={this.state.userData.data}
              columns={[
                {

                  columns: [
                    {
                      Header: "Picture",
                      Cell: (row) => {
                        console.log(row);
                      return <div><img className="imgSize" style={{ height: "150px"}}  src={`profilePicture/${this.state.userData.data[row.index].profilePicture}`}/></div>
                      }
                    },
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
                  Error ...
              </h1>
      )
    }
  } 
}

export default Leaderboard

