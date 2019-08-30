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
							<img src="src/assets/images/IMG_2299-1083.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/Jay_8.jpg" className="carousel_image" alt="..." />
						</Carousel.Item>
						<Carousel.Item>
							<img src="src/assets/images/RFM_LIZ_9.jpg" className="carousel_image" alt="..." />
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
							<h6>photography services for:</h6>
							<p>
								<FontAwesomeIcon icon={faHeart} /> Family
							</p>
							<p>
								<FontAwesomeIcon icon={faCamera} /> Potraits
							</p>
							<p>
								<FontAwesomeIcon icon={faChild} /> Baby Bumps
							</p>
							<p>
								<FontAwesomeIcon icon={faRing} /> Engagements
							</p>
							<p>
								<FontAwesomeIcon icon={faBaby} /> Little ones
							</p>
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
						<p>Is to create life long stories</p>
						<p>and deliver them in the most epic</p>
						<p>way. Building trust, transparency</p>
						<p>and putting our skills to the </p>
						<p> ultimate level of practice.</p>
					</div>
				</div>
			</div>
			<section />
			<section>
				<div className="row container-fluid bg-light text-center">
					<div className="col-sm-4 padedcont">
						<p className="fonti">&copy;RoyalFrames media</p>
					</div>
					<div className="col-sm-4 text-center paded">
						<p className="fonti">
							<FontAwesomeIcon icon={faPhone} />:0700000000
						</p>
						<p className="fonti">
							<FontAwesomeIcon icon={faComment} />:0700000000
						</p>
					</div>
					<div className="col-sm-4 paded">
						<span className="soc-media">
							<SocialIcon url="http://instagram.com/g_m_e23" />
						</span>
						<span className="soc-media">
							<SocialIcon url="http://twitter.com/wafulajames9" />
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
