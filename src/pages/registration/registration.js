import React, { Component } from 'react';
import { Container, Row, Col, Button, Jumbotron } from "reactstrap";
import { Redirect } from 'react-router-dom';
import logo3 from './assets/images/picture4.png';
// import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import Modal from 'react-modal';
import axios from 'axios';
import "./signup.css";
import Center from 'react-center';

var errArray = [];
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

class SignupForm extends Component {

	constructor() {
	super()
		this.state = {
			usernameSignIn: '',
			passwordSignIn: '',
			username: '',
			password: '',
			confirmPassword: '',
			errorMsg: [],
			modalIsOpen: false,
			loginError: false,
			errorMessage: '',
			profilePicture: '',
			loggedin: false,
			redirectTo: null
		};
  };

	componentWillMount(){
		axios.get('/api/').then(response => {
			if(response.data.isAuthenticated === true){
				this.setState({
					loggedin: true,
      	});
			};
		});
	};

	/*Function for Forgot Password*/
	forgotPassword = (event) => {
		event.preventDefault();
		this.openModal();
	}

	/*Function to watch for changes in the form inputs*/
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	/*Function to handle signup on submit*/
	handleSubmit = (event) => {
    event.preventDefault()
    const config = {headers: {'Content-type': 'miltipart/form-data'}}
		let data = new FormData();
    //form data
		data.append('username', this.state.username);
		data.append('password', this.state.password);
		data.append('confirmPassword', this.state.confirmPassword);
		if(this.state.profilePicture[0] != ""){
			data.append('profilePicture', this.state.profilePicture[0]);
		}
    axios.post('/api/signup',data,config).then(response => {

		/*If there is an error which signing up modal shows it otherwise user gets redirected to the lobby*/
		if(response.data.errors){
			for(var i=0;i<response.data.errors.length;i++){
				errArray.push(response.data.errors[i].msg);
			}
			this.openModal();
			errArray = [];
		} else {
			this.setState({
			username: '', password: '', confirmPassword: '', profilePicture: '', redirectTo: "/lobby", loggedin: true
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
				if(response.data.user === null){
					this.setState({loginError: true, errorMessage: "Error! Invalid User Name or Password."});
				} else {
					this.setState({
						usernameSignIn: '', passwordSignIn: '', loggedin: true
					});
				}
			}).catch(error => {
				console.log(error);
				});
		};
	};

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

	// onDrop Event for Picture Upload
	onDrop = (acceptedFiles) => {
		this.setState({
			profilePicture: acceptedFiles
		});
   }

	/*Function to render HTML form*/
	render() {

		if (this.state.loggedin === true) {
			return <Redirect to={{ pathname: "/lobby" }} />
		} else {
			return (
				<Container>
				<Jumbotron>
				  <img src={logo3} alt="Battle Blocks"/>

				  	<br/>

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

											<Dropzone
												onDrop={ this.onDrop }
												accept="image/jpeg,image/jpg,image/png,image/gif"
												multiple={ false }
												className= "form-control">
												Upload Or Drag n Drop Profile Picture
											</Dropzone>

											<div className="controls">
												{this.state.profilePicture &&
													<img data-value={this.state.profilePicture.name} src={this.state.profilePicture[0].preview} className="img-thumbnail preview m-1" alt={this.state.profilePicture.name} key={this.state.profilePicture.name}/>

												}
											</div>
                    	<br/>
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
        		</Jumbotron>
				</Container>

			)
		};
	};
};

export default SignupForm
