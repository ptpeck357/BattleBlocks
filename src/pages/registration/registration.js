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
			path: '/',
			redirectTo: null
    }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
  };

	handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

	handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/signup', {
			email: this.state.email
    }).then(response => {
        console.log(response)
        // if (!response.data.errmsg) {
        //     console.log('youre good')
        //     this.setState({
        //         redirectTo: '/login'
        //     })
        // } else {
        //     console.log('duplicate')
        // }
    })
  };

	render() {
		return (
			<div className="container">
			    <div className="row-fluid">
			        <div className="span12">
			            <div className="span6">
			                <div className="area">
			                    <iron-form id="form1">
			                      <form className="form-horizontal">
			                          <div className="heading">
			                              <h4 className="form-heading">Sign In</h4>
			                          </div>



			                          <div className="control-group">
			                              <label className="control-label" htmlFor=
			                              "inputUsername">Username</label>

			                              <div className="controls">
		                                  <input id="inputUsername"
																				placeholder = "E.g. John Smith" type="text" value={this.state.usernameSignIn}
	                  										onChange={this.handleChange}
																				name="usernameSignIn"
																			/>
			                              </div>
			                          </div>

			                          <div className="control-group">
			                              <label className="control-label" htmlFor=
			                              "inputPassword">Password</label>

			                              <div className="controls">
		                                  <input id="inputPassword"
																				placeholder="Min. 8 Characters"
																				type="password"
																				value={this.state.passwordSignIn}
                    										onChange={this.handleChange}
																				name="passwordSignIn"/>
			                              </div>
			                          </div>

			                          <div className="control-group">
			                              <div className="controls">
			                                  <a className="btn btn-link"
			                                  href="#">Forgot my password</a>
			                                  <button className="btn btn-success" type=
			                                  "submit" id="signin">Sign In</button>
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
			                      <form className="form-horizontal">
			                          <div className="heading">
			                              <h4 className="form-heading">Sign Up</h4>
			                          </div>

			                          <div className="control-group">
			                              <label className="control-label"
																		htmlFor="inputEmail">Email</label>
			                              <div className="controls">
		                                  <input id="email"
																				placeholder="E.g. johnsmith@gmail.com"
																				type="text"
			                                  value={this.state.email}
	                  										onChange={this.handleChange}
																				name="email"	/>
			                              </div>
			                          </div>

			                          <div className="control-group">
			                              <label className="control-label" htmlFor=
			                              "inputUser">Username</label>

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
			                              <label className="control-label" htmlFor=
			                              "inputPassword">Password</label>

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
			                              <label className="control-label" htmlFor=
			                              "inputPassword">Confirm Password</label>

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
			                              <label className="control-label" htmlFor=
			                              "inputUser">Secret Question</label>

			                              <label className="controls" htmlFor=
			                              "inputUser">In Which City Your Father Was Born?</label>

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
			                                 <button id="makenew"
																			 	className="btn btn-success"
																			 	onClick={this.handleSubmit}
																				type="submit" >Sign
			                                  Up
																			</button>
			                              </div>
			                          </div>

			                          <div className="alert alert-info" id="alert-local-success">
			                             <strong>Confirmation:</strong>
			                              User Added!!
			                              Thank you for your registration. Please login!
			                          </div>
			                        </form>
			                    </iron-form>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>

		)
	}
}


export default SignupForm
