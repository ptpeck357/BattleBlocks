import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import "./signup.css";

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
		console.log(this.state.email)
    	event.preventDefault()
    	axios.post('/api/signup', {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
    }).then(response => {
		this.setState({
			email: '', username: '', password: '', confirmPassword: '', secretQuestion: ''
		});

        console.log(response)
        // if (!response.data.errmsg) {
        //     console.log('youre good')
        //     this.setState({
        //         redirectTo: '/login'
        //     })
        // } else {
        //     console.log('duplicate')
        // }
    })}

	/*Function to handle login on submit*/
  	handleSignin = (event) => {
		event.preventDefault()
		axios.post('/api/login', {
			username: this.state.usernameSignIn,
			password: this.state.passwordSignIn
		}).then(response => {
			this.setState({
				usernameSignIn: '', passwordSignIn: ''
			});
		});
	};

	/*Function to render HTML form*/
	render() {
		return (
			<div className="container">
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
													placeholder="Min. 8 Characters"
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

										<div className="alert alert-error" id="alert-local-failure">
											<strong>Access Denied!</strong>
											Please provide valid authorization.
										</div>
									</form>
								</iron-form>
							</div>
						</div>

						<div className="span6">
							<div className="area">
								<iron-form id="form2">
									<form className="form-horizontal" id="signupform">
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
													placeholder="Min. 8 Characters"
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
													placeholder="Min. 8 Characters"
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
			</div>

		);
	};
};


export default SignupForm
