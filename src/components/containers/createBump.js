// import React, { Component } from 'react';
// import '../../assets/styles/blogModal.css';
// import '../../assets/styles/blog.css';
// import MyModal from '../common/modal';
// import Backdrop from '../common/backdrop';
// import BumpList from './bumps/BumpList';
// import axios from 'axios';
// import imageUploader from '../common/image';
// import Spinner from '../common/Spinner';

// class CreateEngagement extends Component {
// 	state = {
// 		creating: false,
// 		bumpArray: [],
// 		isLoading: false,
// 		specificBlog: null,
// 		image: ''
// 	};

// 	constructor(props) {
// 		super(props);

// 		this.imageEl = React.createRef();
// 		this.titleEl = React.createRef();
// 	}

// 	componentDidMount() {
// 		this.fetchBumps();
// 	}

// 	handleCreateEngagement = () => {
// 		this.setState({
// 			creating: true
// 		});
// 	};

// 	handleCancel = () => {
// 		this.setState({
// 			creating: false,
// 			specificBlog: null
// 		});
// 	};

// 	showBlogDetails = (blogId) => {
// 		this.setState((prevState) => {
// 			const selectedBlog = prevState.bumpArray.find((blog) => blog._id === blogId);
// 			return { specificBlog: selectedBlog };
// 		});
// 	};

// 	handleConfirm = () => {
// 		this.setState({
// 			creating: false
// 		});

// 		const selectFile = this.imageEl.current.value;
// 		imageUploader({
// 			image: selectFile
// 		}).then((response) => {
// 			// console.log('responseyapicha', response);
// 			this.setState({
// 				image: response.data.secure_url
// 			});
// 		});
// 		// const image = this.imageEl.current.value;
// 		const image = this.state;
// 		const title = this.titleEl.current.value;

// 		// validation

// 		if (title.trim().length === 0) {
// 			return;
// 		}
// 		// const image = this.state;
// 		const blog = { title, image };
// 		console.log('newBlog', blog);

// 		const requestBody = {
// 			image_path: `${image}`,
// 			title: `${title}`
// 		};

// 		// acces api
// 		axios
// 			.post('http://127.0.0.1:8000/photography/royalframesmedia/bump/', requestBody)
// 			.then((response) => {
// 				console.log('response', response);
// 				this.fetchBumps();
// 			})
// 			.catch((err) => {
// 				console.log('err', err);
// 			});
// 	};

// 	fetchBumps = () => {
// 		this.setState({ isLoading: true });

// 		// acces api
// 		axios
// 			.get('http://127.0.0.1:8000/photography/royalframesmedia/bump/')
// 			.then((response) => {
// 				console.log('response', response.data.results);
// 				const blogs = response.data.results;
// 				this.setState({
// 					bumpArray: blogs,
// 					isLoading: false
// 				});
// 				return response.json();
// 			})
// 			.catch((err) => {
// 				console.log('err', err);
// 			});
// 	};

// 	render() {
// 		const { creating, bumpArray, isLoading, specificBlog } = this.state;
// 		return (
// 			<React.Fragment>
// 				{(creating || specificBlog) && <Backdrop />}
// 				{creating && (
// 					<MyModal
// 						title="Bumps"
// 						canCancel
// 						canConfirm
// 						onCancel={this.handleCancel}
// 						onConfirm={this.handleConfirm}
// 						confirmText="Upload"
// 					>
// 						<form>
// 							<div className="form-ctrl">
// 								<label htmlFor="title">Title</label>
// 								<input placeholder="Title here" type="text" id="title" ref={this.titleEl} />
// 							</div>
// 							<div className="form-ctrl">
// 								<label htmlFor="image">Image</label>
// 								<input type="file" id="image" ref={this.imageEl} />
// 							</div>
// 						</form>
// 					</MyModal>
// 				)}
// 				{specificBlog && (
// 					<MyModal
// 						title={specificBlog.title}
// 						canCancel
// 						canConfirm
// 						onCancel={this.handleCancel}
// 						onConfirm={this.handleConfirm}
// 						confirmText=""
// 					>
// 						<h4>title: {specificBlog.title}</h4>
// 						<p>Description: {specificBlog.description}</p>
// 						<h4>tag: {specificBlog.tag}</h4>
// 					</MyModal>
// 				)}
// 				<div className="hom-ctrl">
// 					<h4>Upload Image</h4>
// 					<button className="btn" onClick={this.handleCreateEngagement}>
// 						{' '}
// 						Click to upload
// 					</button>
// 				</div>
// 				{isLoading ? <Spinner /> : <BumpList bumps={bumpArray} blogDetails={this.showBlogDetails} />}
// 			</React.Fragment>
// 		);
// 	}
// }

// export default CreateEngagement;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/styles/blogModal.css';
import '../../assets/styles/blog.css';
import MyModal from '../common/modal';
import Backdrop from '../common/backdrop';
// import BlogList from './blogs/BlogList';
import BumpList from './bumps/BumpList';
import axios from 'axios';
// import uploadBumpAction from '../actions/CreateBump';
import uploadBumpAction from '../actions/uploadBump';
import { storage } from '../../firebase';
import Spinner from '../common/Spinner';

class CreateBump extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creating: false,
			bumpArray: [],
			isLoading: false,
			specificBlog: null,
			image: ''
		};

		this.handleUpload = this.handleUpload.bind(this);
	}

	onChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	componentDidMount() {
		this.fetchBumps();
	}

	handleCreateBump = () => {
		this.setState({
			creating: true
		});
	};

	handleImage = (e) => {
		if (e.target.files[0]) {
			const image = e.target.files[0];
			console.log('chukuwa', e.target.files[0]);
			this.setState({
				image
			});
		}
	};

	handleUpload = (e) => {
		e.preventDefault();
		const { image } = this.state;
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// shows progress %
			},
			(error) => {
				console.log(error);
			},
			(complete) => {
				// returns completion of upload
				storage.ref('images').child(image.name).getDownloadURL().then((url) => {
					console.log('imgurl', url);
					this.setState({
						image: url
					});
				});
			}
		);
	};
	handleCancel = () => {
		this.setState({
			creating: false,
			specificBlog: null
		});
	};

	showBlogDetails = (blogId) => {
		this.setState((prevState) => {
			const selectedBlog = prevState.bumpArray.find((blog) => blog._id === blogId);
			return { specificBlog: selectedBlog };
		});
	};

	handleConfirm = () => {
		event.preventDefault();
		const { title, image } = this.state;
		const bumpData = { title, image };
		console.log('mimbaData', this.state);

		this.props.uploadBumpAction(bumpData);
	};

	fetchBumps = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('http://127.0.0.1:8000/photography/royalframesmedia/bump/')
			.then((response) => {
				console.log('response', response.data.results);
				const blogs = response.data.results;
				this.setState({
					bumpArray: blogs,
					isLoading: false
				});
				return response.json();
			})
			.catch((err) => {
				console.log('err', err);
			});
	};
	render() {
		const { creating, bumpArray, isLoading, specificBlog } = this.state;
		const userToken = localStorage.getItem('token');
		return (
			<React.Fragment>
				{(creating || specificBlog) && <Backdrop />}
				{creating && (
					<MyModal
						title="Bumps"
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
						confirmText="Upload"
					>
						<form>
							<div className="form-ctrl">
								<label htmlFor="title">Blog tag</label>
								<input
									placeholder="Enter blog tag"
									type="text"
									name="title"
									onChange={this.onChange}
									value={this.state.title}
								/>
							</div>
							<div className="form-ctrl">
								<label htmlFor="image">Image</label>
								<input type="file" onChange={this.handleImage} />
								<button className="btn" onClick={this.handleUpload}>
									Upload
								</button>
							</div>
						</form>
					</MyModal>
				)}
				{specificBlog && (
					<MyModal
						title={specificBlog.title}
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
						confirmText=""
					>
						<h4>title: {specificBlog.title}</h4>
						<p>Description: {specificBlog.description}</p>
						<h4>tag: {specificBlog.tag}</h4>
					</MyModal>
				)}
				{userToken && (
					<div className="hom-ctrl">
						<h4>Upload Bump</h4>
						<button className="btn" onClick={this.handleCreateBump}>
							{' '}
							Click to Upload
						</button>
					</div>
				)}
				<div className="">
					{isLoading ? <Spinner /> : <BumpList bumps={bumpArray} blogDetails={this.showBlogDetails} />}
				</div>
			</React.Fragment>
		);
	}
}

// export default CreateBump;

const mapStateToProps = (state) => ({
	newBump: state.bumpReducer.newBump
});
export default connect(mapStateToProps, { uploadBumpAction })(CreateBump);
