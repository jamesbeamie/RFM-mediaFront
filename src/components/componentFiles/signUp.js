import React, { Component } from 'react';
import '../../assets/styles/auth.css';
import axios from 'axios';
class AuthPage extends Component {
	state = {
		isLogin: true
	};

	constructor(props) {
		super(props);

		// create refs to link input fields
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
		this.nameEl = React.createRef();
	}

	handleSignUp = (event) => {
		event.preventDefault();
		const username = this.nameEl.current.value;
		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}

		console.log('username', username);
		const requestBody = {
			user: {
				username: `${username}`,
				email: `${email}`,
				password: `${password}`
			}
		};

		// acces api
		axios
			.post('http://127.0.0.1:8000/photography/royalframesmedia/users/', requestBody)
			.then((response) => {
				console.log('response', response);
			})
			.catch((err) => {
				console.log('err', err);
			});

		// fetch('http://127.0.0.1:8000/photography/royalframesmedia/users/', {
		// 	method: 'POST',
		// 	body: JSON.stringify({ requestBody }),
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// })
		// 	.then((res) => {
		// 		if (res.status !== 200 && res.status !== 201) {
		// 			throw new Error('Signup failed');
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// console.log(email, password);
	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.handleSignUp}>
				<div className="form-ctrl">
					<label htmlFor="userName">Username:</label>
					<input type="text" id="userName" ref={this.nameEl} />
				</div>
				<div className="form-ctrl">
					<label htmlFor="email">E-mail:</label>
					<input type="email" id="email" ref={this.emailEl} />
				</div>
				<div className="form-ctrl">
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" ref={this.passwordEl} />
				</div>
				<div className="form-axon">
					<button type="submit">Signup</button>
					<a href="/signin">Or login</a>
				</div>
			</form>
		);
	}
}

export default AuthPage;
