import React from 'react';
import '../../assets/styles/footer.css';

const Footer = () => {
	// const activeStyle = { color: '#F15B2A' };

	return (
		<footer className="page-footer font-small">
			<div className="container-fluid fixed-bottom text-center futa-style">
				<div className="row">
					<div className="col-md-4">
						<p>Contact</p>
					</div>
					<div className="col-md-4">
						<p>social icons</p>
					</div>
					<div className="col-md-4">
						<p>copyright</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
