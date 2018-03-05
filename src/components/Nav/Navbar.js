import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "./Navbar.css";

class Navbar extends Component {

	constructor() {
		super()
			this.state = {
				loggedin: true
			};
		};

	/*Function to handle logout on submit*/
	handleSubmit = (event) => {
		event.preventDefault()
		axios.get('/api/logout').then(response => {
			if(response.data.isAuthenticated === false){
				this.setState({
					loggedin: false
      	});
			};
		});
	};

	render(){
		if (this.state.loggedin === false) {
			return <Redirect to={{ pathname: "/" }} />
		} else {
			return(
				<div >
					<nav className="navbar navbar-dark bg-gunmetal fixed-top">
						<h4 id="title"> {this.props.headline} </h4>
						<button onClick={this.handleSubmit} type="submit">Log out</button>
					<a href="/lobby">	<button>Lobby</button></a>
					</nav>
				</div>
			);
		};
	};
};

export default Navbar;
