import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../assets/styles/home.css';
// import { Link } from 'react-router-dom';

const HomePage = () => (
	<div className="wrapper">
		<Carousel>
			<Carousel.Item>
				<img src="src/assets/images/IMG_2358-1083.jpg" className="carousel_image" alt="..." />
				<Carousel.Caption>
					<h3>slide label 1</h3>
					<p>slide.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img src="src/assets/images/IMG_2385-1083.jpg" className="carousel_image" alt="..." />
				<Carousel.Caption>
					<h3>slide label 2</h3>
					<p>slide.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img src="src/assets/images/RFM_YO_14.jpg" className="carousel_image" alt="..." />
				<Carousel.Caption>
					<h3>slide label 3</h3>
					<p>slide.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	</div>
);

export default HomePage;
