import React, { Component } from 'react';
import '../../assets/styles/auth.css';
import axios from 'axios';
// import loginContext from '../common/loginContext';
class LoginPage extends Component {
	// static contextType = loginContext;

	constructor(props) {
		super(props);

		// create refs to link input fields
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
	}

	handleSignUp = (event) => {
		event.preventDefault();
		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}

		const requestBody = {
			user: {
				email: `${email}`,
				password: `${password}`
			}
		};

		// acces api
		axios
			.post('http://127.0.0.1:8000/photography/royalframesmedia/users/login/', requestBody)
			.then((response) => {
				console.log('response', response);
			})
			.catch((err) => {
				console.log('err', err);
			});

		// fetch('https://royalframes-photography.herokuapp.com/photography', {
		// 	method: 'POST',
		// 	body: JSON.stringify(requestBody),
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// })
		// 	.then((res) => {
		// 		if (res.status !== 200 && res.status !== 201) {
		// 			throw new Error('Login failed');
		// 		}
		// 		return res.json();
		// 	})
		// 	.then((resData) => {
		// 		if (resData.data.login.token) {
		// 			// pass the backend data to the context
		// 			this.context.login(
		// 				resData.data.login.token,
		// 				resData.data.login.userId,
		// 				resData.data.login.tokenExpires
		// 			);
		// 		}
		// 		// console.log('result', resData);
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
					<label htmlFor="email">E-mail:</label>
					<input type="email" id="email" ref={this.emailEl} />
				</div>
				<div className="form-ctrl">
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" ref={this.passwordEl} />
				</div>
				<div className="form-axon">
					<button type="submit">login</button>
					<a href="/link-to-reset">forgoten password?</a>
				</div>
			</form>
		);
	}
}

export default LoginPage;
