import React, { Component } from 'react';
import '../../assets/styles/blogModal.css';
import '../../assets/styles/blog.css';
import MyModal from '../common/modal';
import Backdrop from '../common/backdrop';
import BlogList from './blogs/BlogList';
import axios from 'axios';
import imageUploader from '../common/image';
import Spinner from '../common/Spinner';

class CreateBlog extends Component {
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
		this.descriptionEl = React.createRef();
		this.bodyEl = React.createRef();
	}

	componentDidMount() {
		this.fetchBlogs();
	}

	handleCreateBlog = () => {
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
		const description = this.descriptionEl.current.value;
		const body = this.bodyEl.current.value;

		// validation

		if (title.trim().length === 0 || description.trim().length === 0 || body.trim().length === 0) {
			return;
		}
		// const image = this.state;
		const blog = { title, description, body, image };
		console.log('newBlog', blog);

		const requestBody = {
			image_path: `${image}`,
			title: `${title}`,
			description: `${description}`,
			body: `${body}`
		};

		// acces api
		axios
			.post('http://127.0.0.1:8000/photography/royalframesmedia/blog/', requestBody)
			.then((response) => {
				console.log('response', response);
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	fetchBlogs = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('http://127.0.0.1:8000/photography/royalframesmedia/blog/')
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
						title="Create blog"
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
						confirmText="Post"
					>
						<form>
							<div className="form-ctrl">
								<label htmlFor="title">Title</label>
								<input placeholder="Title here" type="text" id="title" ref={this.titleEl} />
							</div>
							<div className="form-ctrl">
								<label htmlFor="description">describe</label>
								<input type="text" id="description" ref={this.descriptionEl} />
							</div>
							<div className="form-ctrl">
								<label htmlFor="body">Body</label>
								<textarea placeholder="300 words max" id="body" ref={this.bodyEl} />
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
					<h4>Create Blog</h4>
					<button className="btn" onClick={this.handleCreateBlog}>
						{' '}
						Click to create
					</button>
				</div>
				{isLoading ? <Spinner /> : <BlogList blogs={blogArray} blogDetails={this.showBlogDetails} />}
			</React.Fragment>
		);
	}
}

export default CreateBlog;
