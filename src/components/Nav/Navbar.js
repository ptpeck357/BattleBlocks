import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

class Navbar extends Component {

	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div >
				<nav className="navbar navbar-dark bg-gunmetal fixed-top">
					<h4 id="title"> {this.props.headline} </h4>
					<Link to={this.props.href}>
						<button
							className="btn"
							onClick={this.props.navClick}
							type="button"
							>
							{this.props.navAction}
						</button>
					</Link>
				</nav>
			</div>
		);
	};
};

export default Navbar;
