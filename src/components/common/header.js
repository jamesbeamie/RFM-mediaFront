import React from 'react';
import '../../assets/styles/header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
	const userToken = localStorage.getItem('token');
	return (
		<nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light navigation-style text-center">
			<a className="navbar-brand" href="/">
				<img src="src/assets/logo/RFM-logo.png" className="logo" alt="logo" />
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item active">
						<NavLink className="nav-link" to="/blog" exact>
							BLOG
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/potraits" exact>
							POTRAITS
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/engagements" exact>
							ENGAGEMENTS
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/kids" exact>
							LITTLE ONES
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/family" exact>
							FAMILY
						</NavLink>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/bumps">
							BUMPS
						</a>
					</li>
					{!userToken && (
						<li className="nav-item">
							<NavLink className="nav-link" to="/signin" exact>
								SIGNIN
							</NavLink>
						</li>
					)}
					{userToken && (
						<li className="nav-item">
							<NavLink className="nav-link" to="/logout" exact>
								LOGOUT
							</NavLink>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Header;
