import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "./signup.css";
import logo3 from './assests/images/Picture3.png';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';

var errArray = [];
var objrow;
const customStyles = {
  	content : {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
 	}
};

const backdropStyle = {
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	backgroundColor: 'rgba(0,0,0,0.3)',
	padding: 50
};

const modalStyle = {
	backgroundColor: '#fff',
	borderRadius: 5,
	maxWidth: 500,
	minHeight: 300,
	margin: '0 auto',
	padding: 30
};

class SignupForm extends Component {

	constructor() {
	super()
		this.state = {
			usernameSignIn: '',
			passwordSignIn: '',
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			secretQuestion: '',
			path: null,
			errorMsg: [],
			modalIsOpen: false,
			loginError: false,
			errorMessage: "",
			redirectTo: null
		};
  	};

	/*Function to watch for changes in the form inputs*/
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	/*Function to handle signup on submit*/
	handleSubmit = (event) => {
    	event.preventDefault()
    	axios.post('/api/signup', {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
    }).then(response => {

	/*If there is an error which signing up modal shows it otherwise user gets redirected to the lobby*/
		if(response.data.errors){
			for(var i=0;i<response.data.errors.length;i++){
				errArray.push(response.data.errors[i].msg);
			}
			this.openModal();
			errArray = [];
		} else {
				this.setState({
				email: '', username: '', password: '', confirmPassword: '', secretQuestion: ''
				});
		}

		}).catch((error) => {
			console.log(error);
		});
	};

	/*Function to handle login on submit*/
  	handleSignin = (event) => {
		event.preventDefault();
		if(this.state.usernameSignIn === ""){
			this.setState({loginError: true, errorMessage: "Please Enter The User Name."});
		} else if (this.state.passwordSignIn === ""){
			this.setState({loginError: true, errorMessage: "Please Enter The Password."});
		} else {
			axios.post('/api/login', {
				username: this.state.usernameSignIn,
				password: this.state.passwordSignIn
			}).then(response => {
				console.log(response)
				if(response.data.user === null){
					this.setState({loginError: true, errorMessage: "Error! Invalid User Name or Password."});
					console.log(response.data.message);
				} else {
					console.log("logged in");
					this.setState({
				 		usernameSignIn: '', passwordSignIn: '', redirectTo: "/lobby"
					});
				}

			}).catch(error => {
				console.log(error);
			  });
		}
	};

	/*Function to handle logout on submit*/
	handlelogout = (event) => {
		event.preventDefault();
		axios.get('/api/logout').then(response => {
			console.log(response)
			this.setState({
				usernameSignIn: '', passwordSignIn: '', redirectTo: "/lobby"
		   });
		})
	}

	openModal = () => {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}

	closeModal = () => {
		this.setState({modalIsOpen: false});
	}

	/*Function to render HTML form*/
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (

				<div className="container">

				<img src={logo3} alt="Battle Blocks"/>
					<div className="row-fluid">
						<div className="span12">

							<div className="span6">
								<div className="area">
									<iron-form id="form1">
										<form className="form-horizontal" id="loginform">
											<div className="heading">
												<h4 className="form-heading">Sign In</h4>
											</div>

											<div className="control-group">
												<label className="control-label" htmlFor="inputUsername">Username</label>
												<div className="controls">
													<input id="inputUsername"
														placeholder = "E.g. John Smith" type="text" value={this.state.usernameSignIn}
														onChange={this.handleChange}
														name="usernameSignIn"
													/>
												</div>
											</div>
											

											<div className="control-group">
												<label className="control-label" htmlFor="inputPassword">Password</label>
												<div className="controls">
													<input id="inputPassword"
														placeholder="Min. 6 Characters"
														type="password"
														value={this.state.passwordSignIn}
														onChange={this.handleChange}
														name="passwordSignIn"
													/>
												</div>
											</div>

											<div className="control-group">
												<div className="controls">
													<a className="btn btn-link" href="#">Forgot my password</a>
													<button className="btn btn-success" onClick={this.handleSignin} type="submit" id="signin">Sign In</button>
												</div>
											</div>
											{this.state.loginError &&
												<div className="alert alert-danger" role="alert"> 
	  												{this.state.errorMessage}
												</div>
											}
											
										</form>
									</iron-form>
								</div>
							</div>

							<div className="span6">
								<div className="area">
									<iron-form id="form2">
										<form className="form-horizontal" id="c">
											<div className="heading">
												<h4 className="form-heading">Sign Up</h4>
											</div>

											<div className="control-group">
												<label className="control-label"htmlFor="inputEmail">Email</label>
												<div className="controls">
													<input id="email"
														placeholder="E.g. johnsmith@gmail.com"
														type="text"
														value={this.state.email}
														onChange={this.handleChange}
														name="email"
													/>
												</div>
											</div>

											<div className="control-group">
												<label className="control-label" htmlFor="inputUser">Username</label>
												<div className="controls">
													<input id="userName"
														placeholder="E.g. John Smith"
														type="text"
														value={this.state.username}
														onChange={this.handleChange}
														name="username"
													/>
												</div>
											</div>

											<div className="control-group">
												<label className="control-label" htmlFor="inputPassword">Password</label>
												<div className="controls">
													<input id="password"
														placeholder="Min. 6 Characters"
														type="password"
														value={this.state.password}
														onChange={this.handleChange}
														name="password"
													/>
												</div>
											</div>

											<div className="control-group">
												<label className="control-label" htmlFor= "inputPassword">Confirm Password</label>
												<div className="controls">
													<input id="confirmPassword"
														placeholder="Min. 6 Characters"
														type="password"
														value={this.state.confirmPassword}
														onChange={this.handleChange}
														name="confirmPassword"
													/>
												</div>
											</div>

											<div className="control-group">
												<label className="control-label" htmlFor="inputUser">Secret Question</label>

												<label className="controls" htmlFor="inputUser">In Which City Your Father Was Born?</label>

												<div className="controls">
													<input id="secretQuestion"
														placeholder= "E.g. Chicago"
														type="text"
														value={this.state.secretQuestion}
														onChange={this.handleChange}
														name="secretQuestion"
													/>
												</div>
											</div>

											<div className="control-group">
												<div className="controls">
													<button id="makenew" className="btn btn-success" onClick={this.handleSubmit} type="submit" >Sign up</button>
												</div>
											</div>
										</form>
									</iron-form>
									</div>
								</div>
							</div>
						</div>
					<div>
				</div>

        <Modal
         	isOpen={this.state.modalIsOpen}
          	onAfterOpen={this.afterOpenModal}
          	onRequestClose={this.closeModal}
          	style={customStyles}
          	contentLabel="Error"
        >
        <h2 ref={subtitle => this.subtitle = subtitle}>Error! </h2>
		<ul>
			{errArray.map(function(errorMessgae, index){
				return <li key={ index }>{errorMessgae}</li>;
				})}
        </ul>
        </Modal>

	</div>

			)
		};
	};
};

export default SignupForm
