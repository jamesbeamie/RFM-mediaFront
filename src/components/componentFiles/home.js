import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../assets/styles/home.css';
// import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<React.Fragment>
			<section>
				<div className="wrapper">
					<Carousel>
						<Carousel.Item>
							<img src="src/assets/images/IMG_2299-1083.jpg" className="carousel_image" alt="..." />
							<Carousel.Caption>
								<h3>slide label 1</h3>
								<p>slide.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/Jay_8.jpg" className="carousel_image" alt="..." />
							<Carousel.Caption>
								<h3>slide label 2</h3>
								<p>slide.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/RFM_LIZ_9.jpg" className="carousel_image" alt="..." />
							<Carousel.Caption>
								<h3>slide label 3</h3>
								<p>slide.</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</div>
			</section>
			<div className="container-fluid homu">
				<div className="row ">
					<div className="col-sm-12 text-center ">
						<h4>About Us</h4>
						<hr className="horzLine" />
					</div>
					<div className="col-sm-6 text-center paded">
							<h4>We do...</h4>
						<hr className="horzLine" />

						<div className="text-left content">
							<p>photography services for:</p>
							<p>Family</p>
							<p>Potraits</p>
							<p>Baby Bumps</p>
							<p>Engagements</p>
							<p>Little ones</p>
						</div>
					</div>
					<div className="col-sm-6 text-center paded">
						<img
							src="src/assets/images/RFM_NP_NC_2.jpg"
							className="img-responsive picha rounded-circle"
							alt="..."
						/>
					</div>
				</div>

				<div className="row jumbotron bgkala">
					<div className="col-sm-6 text-center">
						<img src="src/assets/images/RFP_D_3b.jpg" className="img-responsive picha" alt="..." />
					</div>
					<div className="col-sm-6 text-center">
						<h4>Our passion</h4>
						<hr className="horzLine" />
						<p>Is to create life long storlives</p>
						<p>of our lives of our livesof our </p>
						<p>jdfvbdfjvhbfddbfdbdddjddbfdbdddj</p>
						<p>jdfvbdfjvhbfddbfdbdddjddbfdbdddj</p>
						<p>jdfvbdfjvhbfddbfdbdddjddbfdbdddj</p>
					</div>
				</div>
			</div>
			<section />
			<section>
				<div className="container-fluid bg-light text-center">
					<div className="col-sm-12 text-center paded">
						<p>&copy;:RFM</p>
						<p>social links with i</p>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default HomePage;
