import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/styles/blogModal.css';
import '../../assets/styles/blog.css';
import MyModal from '../common/modal';
import Backdrop from '../common/backdrop';
// import BlogList from './blogs/BlogList';
import EngagementList from './engagements/EngagementList';
import axios from 'axios';
import uploadEngagementAction from '../actions/uploadEngagement';
import { storage } from '../../firebase';
import Spinner from '../common/Spinner';

class CreateEngagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creating: false,
			engagementArray: [],
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
		this.fetchEngagements();
	}

	handleCreateEngagement = () => {
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
			const selectedBlog = prevState.engagementArray.find((blog) => blog._id === blogId);
			return { specificBlog: selectedBlog };
		});
	};

	handleConfirm = () => {
		event.preventDefault();
		const { title, image } = this.state;
		const engagementData = { title, image };
		console.log('mimbaData', this.state);

		this.props.uploadEngagementAction(engagementData);
	};

	fetchEngagements = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('http://127.0.0.1:8000/photography/royalframesmedia/engagements/')
			.then((response) => {
				console.log('response', response.data.results);
				const blogs = response.data.results;
				this.setState({
					engagementArray: blogs,
					isLoading: false
				});
				return response.json();
			})
			.catch((err) => {
				console.log('err', err);
			});
	};
	render() {
		const { creating, engagementArray, isLoading, specificBlog } = this.state;
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
								<label htmlFor="title">Title</label>
								<input
									placeholder="Title here"
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
				<div className="hom-ctrl">
					<h4>Upload Engagement</h4>
					<button className="btn" onClick={this.handleCreateEngagement}>
						{' '}
						Click to Upload
					</button>
				</div>
				<div className="">
					{isLoading ? (
						<Spinner />
					) : (
						<EngagementList engagements={engagementArray} blogDetails={this.showBlogDetails} />
					)}
				</div>
			</React.Fragment>
		);
	}
}

// export default CreateEngagement;

const mapStateToProps = (state) => ({
	newEngagement: state.engagementReducer.newEngagement
});
export default connect(mapStateToProps, { uploadEngagementAction })(CreateEngagement);
