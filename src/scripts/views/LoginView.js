import React from 'react'
import ACTIONS from '../actions'

const LoginView = React.createClass({
	render: function() {
		return (
			<div className="loginView">
				<div id="headerContainer"><marquee height="50" behavior="alternate" direction="up" >Mongo Messages</marquee></div>
				<RegisterBox />
				<LoginBox />
			</div>
			)
	}
})

const RegisterBox = React.createClass({

	_handleRegister: function(evt) {
		evt.preventDefault()
		ACTIONS.registerUser(evt.currentTarget.email.value,evt.currentTarget.password.value)
	},

	render: function() {
		return (
			<div className="loginBox register">
				<h3>Register</h3>
				<form onSubmit={this._handleRegister} >
					<input type="email" name="email" placeholder="enter your email" />
					<input type="password" name="password" placeholder="enter a password" />
					<button type="submit">sign up!</button>
				</form>
			</div>
			)
	}
})

const LoginBox = React.createClass({

	_handleLogin: function(evt) {
		evt.preventDefault()
		ACTIONS.logUserIn(evt.currentTarget.email.value,evt.currentTarget.password.value)
	},

	render: function() {
		return (
			<div className="loginBox login">
				<form onSubmit={this._handleLogin} >
					<h3>Log in</h3>
					<input type="email" name="email" placeholder="enter your email" />
					<input type="password" name="password" placeholder="enter a password" />
					<button type="submit">log in!</button>
				</form>
			</div>
			)
	}
})
export default LoginView