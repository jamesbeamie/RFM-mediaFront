import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/styles/blogModal.css';
import '../../assets/styles/blog.css';
import MyModal from '../common/modal';
import Backdrop from '../common/backdrop';
import BlogList from './blogs/BlogList';
import axios from 'axios';
import createBlogAction from '../actions/createBlog';
import { storage } from '../../firebase';
import Spinner from '../common/Spinner';

class CreateBlog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creating: false,
			blogArray: [],
			isLoading: false,
			specificBlog: null,
			title: '',
			description: '',
			body: '',
			image: null,
			url: ''
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
		this.fetchBlogs();
	}

	handleCreateBlog = () => {
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
			const selectedBlog = prevState.blogArray.find((blog) => blog._id === blogId);
			return { specificBlog: selectedBlog };
		});
	};

	handleConfirm = () => {
		event.preventDefault();
		const { title, description, body, image } = this.state;
		const blogData = { title, description, body, image };
		console.log('blogData', this.state);

		this.props.createBlogAction(blogData);
		// this.setState({
		// 	creating: false
		// });

		// const title = this.titleEl.current.value;
		// const description = this.descriptionEl.current.value;
		// const body = this.bodyEl.current.value;

		// // validation

		// if (title.trim().length === 0 || description.trim().length === 0 || body.trim().length === 0) {
		// 	return;
		// }
		// const image = this.state;
		// const blog = { title, description, body, image };
		// console.log('newBlog', blog);

		// const requestBody = {
		// 	image_path: `${image}`,
		// 	title: `${title}`,
		// 	description: `${description}`,
		// 	body: `${body}`
		// };

		// // acces api
		// axios
		// 	.post('http://127.0.0.1:8000/photography/royalframesmedia/blog/', requestBody)
		// 	.then((response) => {
		// 		console.log('response', response);
		// 		this.fetchBlogs();
		// 	})
		// 	.catch((err) => {
		// 		console.log('err', err);
		// 	});
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
								<input
									placeholder="Title here"
									type="text"
									name="title"
									onChange={this.onChange}
									value={this.state.title}
								/>
							</div>
							<div className="form-ctrl">
								<label htmlFor="description">describe</label>
								<input
									type="text"
									name="description"
									onChange={this.onChange}
									value={this.state.description}
								/>
							</div>
							<div className="form-ctrl">
								<label htmlFor="body">Body</label>
								<textarea
									placeholder="300 words max"
									name="body"
									onChange={this.onChange}
									value={this.state.body}
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
					<h4>Create Blog</h4>
					<button className="btn" onClick={this.handleCreateBlog}>
						{' '}
						Click to create
					</button>
				</div>
				<div className="">
					{isLoading ? <Spinner /> : <BlogList blogs={blogArray} blogDetails={this.showBlogDetails} />}
				</div>
			</React.Fragment>
		);
	}
}

// export default CreateBlog;

const mapStateToProps = (state) => ({
	newBlog: state.blogReducer.newBlog,
	blogs: state.blogReducer.blogs.data
});
export default connect(mapStateToProps, { createBlogAction })(CreateBlog);
