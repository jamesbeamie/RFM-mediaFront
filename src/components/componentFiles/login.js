import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../../assets/styles/auth.css';
import axios from 'axios';
import signInAction from '../actions/signIn';
class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// username: '',
			email: '',
			password: ''
		};
	}

	onChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSignUp = (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		const loginData = { email, password };
		console.log('loginData', this.state);

		this.props.signInAction(loginData);
		// event.preventDefault();
		// const email = this.emailEl.current.value;
		// const password = this.passwordEl.current.value;

		// if (email.trim().length === 0 || password.trim().length === 0) {
		// 	return;
		// }

		// const requestBody = {
		// 	user: {
		// 		email: `${email}`,
		// 		password: `${password}`
		// 	}
		// };

		// // acces api
		// axios
		// 	.post('http://127.0.0.1:8000/photography/royalframesmedia/users/login/', requestBody)
		// 	.then((response) => {
		// 		console.log('response', response);
		// 	})
		// 	.catch((err) => {
		// 		console.log('err', err);
		// 	});
	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.handleSignUp}>
				<div className="form-ctrl">
					<label htmlFor="email">E-mail:</label>
					<input type="email" name="email" onChange={this.onChange} value={this.state.email} />
				</div>
				<div className="form-ctrl">
					<label htmlFor="password">Password:</label>
					<input type="password" name="password" onChange={this.onChange} value={this.state.password} />
				</div>
				<div className="form-axon">
					<button type="submit">Login</button>
					<a href="/link-to-reset">Forgot password?</a>
				</div>
			</form>
		);
	}
}

// export default LoginPage;
const mapStateToProps = (state) => ({
	signin: state.signInReducer.loginUser
});
export default connect(mapStateToProps, { signInAction })(LoginPage);
