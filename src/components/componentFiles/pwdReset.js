import React, { Component } from 'react';
import '../../assets/styles/auth.css';
import axios from 'axios';
// import loginContext from '../common/loginContext';
class PwdReset extends Component {
	// static contextType = loginContext;

	constructor(props) {
		super(props);

		// create refs to link input fields
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
		this.confirmpasswordEl = React.createRef();
	}

	handleSignUp = (event) => {
		event.preventDefault();
		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;
		const confirmpassword = this.confirmpasswordEl.current.value

		if (email.trim().length === 0 || password.trim().length === 0 || confirmpassword !== password) {
			console.log('pwderrrrorrrr', )
			return;
		}

		const requestBody = {
			email: `${email}`,
			password: `${password}`
		};

		// acces api
		axios
			.patch('http://127.0.0.1:8000/photography/royalframesmedia/users/password_reset/', requestBody)
			.then((response) => {
				console.log('response', response);
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.handleSignUp}>
				<div className="form-ctrl">
					<label htmlFor="email">E-mail:</label>
					<input placeholder="Enter your registered email" type="email" id="email" ref={this.emailEl} />
				</div>
				<div className="form-ctrl">
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" ref={this.passwordEl} />
				</div>
				<div className="form-ctrl">
					<label htmlFor="confirmpassword">Confirm Password:</label>
					<input type="password" id="confirmpassword" ref={this.confirmpasswordEl} />
				</div>
				<div className="form-axon">
					<button type="submit">Reset</button>
				</div>
			</form>
		);
	}
}

export default PwdReset;
