import React from 'react';
import '../../assets/styles/header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
	// const activeStyle = { color: '#F15B2A' };

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
						<NavLink className="nav-link" to="/about" exact>
							blog
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/about" exact>
							Potraits
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="#" exact>
							Engagements
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/about" exact>
							Little ones
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/about" exact>
							Family
						</NavLink>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							Bumps
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
