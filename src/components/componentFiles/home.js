import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby, faCamera, faHeart, faRing, faChild, faPhone, faComment } from '@fortawesome/free-solid-svg-icons';
import { SocialIcon } from 'react-social-icons';
import '../../assets/styles/home.css';
// import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<React.Fragment>
			<section>
				<div className="wrapper">
					<Carousel>
						<Carousel.Item>
							<img src="src/assets/images/RFM_NP_NC_2.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/RFP_D_3b.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/RFP_PK_4.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/IMG_2299-1083.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/RFM_MU_4.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/RFM_SG_22.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/RFM_SJ (28).jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
					</Carousel>
				</div>
			</section>

			<section>
				<div className="row container-fluid bg-light text-center">
					<div className="col-sm-4 padedcont">
						<p className="fonti">&copy;RoyalFramesMedia</p>
					</div>
					<div className="col-sm-4 text-center paded">
						<p className="fonti">
							<FontAwesomeIcon icon={faPhone} /> 0700000000
						</p>
						<p className="fonti">
							<FontAwesomeIcon icon={faComment} /> 0700000000
						</p>
					</div>
					<div className="col-sm-4 paded">
						<span className="soc-media">
							<SocialIcon url="http://instagram.com/g_m_e23" />
						</span>
						<span className="soc-media">
							<SocialIcon url="http://facebook.com/Jeamiejames" />
						</span>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default HomePage;
