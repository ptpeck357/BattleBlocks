import React, { Component } from 'react'
import {  Jumbotron, Button, Container } from "reactstrap"
import axios from 'axios'
//import styles from "./leaderboard.css"
import ReactTable from 'react-table'
// import { render } from "react-dom";
import "react-table/react-table.css";
import Moment from 'react-moment';


// leaderboard class with the userData and isMounting variable to render the data
class Leaderboard extends Component {
  state = {
    userData:{},
    isMounting: ""
  };

  // making axios call and getting response from api.js
  // response comes from the database, then setting up the state
    componentDidMount() {
      console.log(this.state.userData)

      axios.get('/api/leaderboard').then(
        response => { this.setState({ userData: response, isMounting:true })
          console.log(this.state.userData);
      }).catch(err => console.log(err));
    }

 // rendering the data in a react table
  render() {
    const id =1;

    if(this.state.isMounting){
      return(
        <Container fluid>
        <Jumbotron>
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
                      return <div><img alt="Not available" className="imgSize" style={{ height: "250px", width: "250px"}}  src={`profilePicture/${this.state.userData.data[row.index].profilePicture}`}/></div>
                      }
                    },
                    {
                      Header: "Member Since",
                      Cell: (row) => {
                      return <Moment fromNow ago>{this.state.userData.data[row.index].joindate}</Moment>
                      }
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
                      Header: "Total Games",
                      accessor: "totalgames"
                    },
                    {
                      Header: "Total Score",
                      accessor: "totalscore"
                    }
                  ]
                }
              ]}
              defaultSorted={[
                {
                  id: "totalscore",
                  desc: true
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />

          </div>
        </Jumbotron>
        </Container>
      )
    } else {
      return(
        <h1 className="header">
          Error ...
        </h1>
      )
    }
  }
}

export default Leaderboard

