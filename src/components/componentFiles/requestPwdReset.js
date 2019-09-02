import React, { Component } from 'react';
import '../../assets/styles/auth.css';
// import loginContext from '../common/loginContext';
class ResetRequest extends Component {
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
			query: `
                query{
                    login(email: "${email}", password: "${password}"){
                      userId
                      token
                    }
                  }
            `
		};

		// acces api
		fetch('https://royalframes-photography.herokuapp.com/photography', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Login failed');
				}
				return res.json();
			})
			.then((resData) => {
				if (resData.data.login.token) {
					// pass the backend data to the context
					this.context.login(
						resData.data.login.token,
						resData.data.login.userId,
						resData.data.login.tokenExpires
					);
				}
				// console.log('result', resData);
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(email, password);
	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.handleSignUp}>
				<div className="form-ctrl">
					<label htmlFor="email">E-mail:</label>
					<input placeholder="enter a registered email to recieve reset link" type="email" id="email" ref={this.emailEl} />
				</div>
				<div className="form-axon">
					<button type="submit">Send link</button>
				</div>
			</form>
		);
	}
}

export default ResetRequest;
