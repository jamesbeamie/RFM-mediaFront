import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../../assets/styles/auth.css';
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
	};

	render() {
		console.log('ma-auth', this.props);
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
