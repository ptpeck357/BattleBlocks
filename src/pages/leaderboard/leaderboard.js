import React, { Component } from 'react';
import {  Jumbotron, Container } from "reactstrap";
import Navbar from "../../components/Nav/index";
import "react-table/react-table.css";
import Moment from 'react-moment';
import ReactTable from 'react-table';
import axios from 'axios';
import logo4 from '../registration/assets/images/leaderboard.png';

const customstyle = {
  textAlign: 'center'
}

const style = {
  marginTop: "15px"
}

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

    return(
      <Container fluid>
      <br/><br/>
        <img style={style} src={logo4} alt="Battle Blocks"/>
        <Navbar
          headline = {"Leaderboard"}
          href = {"/lobby"}
          navAction = {"Lobby"}
        />
        <Jumbotron>
          <div>
            <ReactTable style={customstyle}
              data={this.state.userData.data}
              columns={[
                {
                  columns: [
                    // {
                    //   Header: <strong>Profile Picture</strong>,
                    //   Cell: (row) => {
                    //   return <div><img alt="Not available" className="imgSize" style={{ height: "5%"}}  src={`profilePicture/${this.state.userData.data[row.index].profilePicture}`}/></div>
                    //   }
                    // },
                    {
                      Header: <strong>User Name</strong>,
                      id: "username",
                      accessor: d => d.username
                    },
                    {
                      Header: <strong>Member Since</strong>,
                      Cell: (row) => {
                      return <Moment fromNow ago>{this.state.userData.data[row.index].joindate}</Moment>
                      }
                    },
                    {
                      Header: <strong>Wins</strong>,
                      accessor: "wins"
                    },
                    {
                      Header: <strong>Total Games</strong>,
                      accessor: "totalgames"
                    },
                    {
                      Header: <strong>Total Points</strong>,
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

