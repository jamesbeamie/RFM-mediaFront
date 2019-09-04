import React, { Component } from 'react';
import '../../assets/styles/blogModal.css';
import '../../assets/styles/blog.css';
import MyModal from '../common/modal';
import Backdrop from '../common/backdrop';
import ChildrenList from './children/ChildrenList';
import axios from 'axios';
import imageUploader from '../common/image';
import Spinner from '../common/Spinner';

class CreateEngagement extends Component {
	state = {
		creating: false,
		blogArray: [],
		isLoading: false,
		specificBlog: null,
		image: ''
	};

	constructor(props) {
		super(props);

		this.imageEl = React.createRef();
		this.titleEl = React.createRef();
	}

	componentDidMount() {
		this.fetchBlogs();
	}

	handleCreateEngagement = () => {
		this.setState({
			creating: true
		});
	};

	handleCancel = () => {
		this.setState({
			creating: false,
			specificBlog: null
		});
	};

	showBlogDetails = (blogId) => {
		this.setState((prevState) => {
			const selectedBlog = prevState.blogArray.find((blog) => blog._id === blogId);
			return { specificBlog: selectedBlog };
		});
	};

	handleConfirm = () => {
		this.setState({
			creating: false
		});

		const selectFile = this.imageEl.current.value;
		imageUploader({
			image: selectFile
		}).then((response) => {
			// console.log('responseyapicha', response);
			this.setState({
				image: response.data.secure_url
			});
		});
		// const image = this.imageEl.current.value;
		const image = this.state;
		const title = this.titleEl.current.value;

		// validation

		if (title.trim().length === 0) {
			return;
		}
		// const image = this.state;
		const blog = { title, image };
		console.log('newBlog', blog);

		const requestBody = {
			image_path: `${image}`,
			title: `${title}`
		};

		// acces api
		axios
			.post('http://127.0.0.1:8000/photography/royalframesmedia/children/', requestBody)
			.then((response) => {
				console.log('response', response);
				this.fetchBlogs();
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	fetchBlogs = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('http://127.0.0.1:8000/photography/royalframesmedia/children')
			.then((response) => {
				console.log('response', response.data.results);
				const blogs = response.data.results;
				this.setState({
					blogArray: blogs,
					isLoading: false
				});
				return response.json();
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	render() {
		const { creating, blogArray, isLoading, specificBlog } = this.state;
		return (
			<React.Fragment>
				{(creating || specificBlog) && <Backdrop />}
				{creating && (
					<MyModal
						title="Children images"
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
						confirmText="Upload"
					>
						<form>
							<div className="form-ctrl">
								<label htmlFor="title">Title</label>
								<input placeholder="Title here" type="text" id="title" ref={this.titleEl} />
							</div>
							<div className="form-ctrl">
								<label htmlFor="image">Image</label>
								<input type="file" id="image" ref={this.imageEl} />
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
					<h4>Upload Image</h4>
					<button className="btn" onClick={this.handleCreateEngagement}>
						{' '}
						Click to upload
					</button>
				</div>
				{isLoading ? <Spinner /> : <ChildrenList childrens={blogArray} blogDetails={this.showBlogDetails} />}
			</React.Fragment>
		);
	}
}

export default CreateEngagement;
