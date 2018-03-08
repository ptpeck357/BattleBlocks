import React, { Component } from 'react'
import {  Jumbotron, Button, Container } from "reactstrap"
import axios from 'axios'
import ReactTable from 'react-table'
import Navbar from "../../components/Nav/index";
import "react-table/react-table.css";
import Moment from 'react-moment';
import "./leaderboard.css"

// leaderboard class with the userData and isMounting variable to render the data
class Leaderboard extends Component {
  state = {
    userData:{}
  };

  componentWillMount() {
    axios.get('/api/leaderboard').then(response => {
      this.setState({
        userData: response
      })
    }).catch(err => console.log(err));
  };

 // rendering the data in a react table
  render() {
    const id =1;

      return(
        <Container fluid>
        <Navbar
        headline = {"Leaderboard"}
        href = {"/lobby"}
        navAction = {"Lobby"}
      />
        <Jumbotron>
          <h1 className="leadboardTitle">Leaderboard</h1>
          <div>
            <ReactTable
              data={this.state.userData.data}
              columns={[
                {
                  columns: [
                    {
                      Header: <strong>Profile Picture</strong>,
                      Cell: (row) => {
                      return <div><img alt="Not available" className="imgSize" style={{ height: "5%"}}  src={`profilePicture/${this.state.userData.data[row.index].profilePicture}`}/></div>
                      }
                    },
                    {
                      Header: <strong>Member Since</strong>,
                      Cell: (row) => {
                      return <Moment fromNow ago>{this.state.userData.data[row.index].joindate}</Moment>
                      }
                    },
                    {
                      Header: <strong>User Name</strong>,
                      id: "username",
                      accessor: d => d.username
                    },
                    {
                      Header: <strong>Wins</strong>,
                      accessor: "wins"
                    },
                    {
                      Header: <strong>Losses</strong>,
                      accessor: "losses"
                    },
                    {
                      Header: <strong>Total Games</strong>,
                      accessor: "totalgames"
                    },
                    {
                      Header: <strong>Total Score</strong>,
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
  };
};

export default Leaderboard

