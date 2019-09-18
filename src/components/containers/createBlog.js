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
		this.fetchBlogs();
	};

	showBlogDetails = (slug) => {
		const { blogArray } = this.state;
		const selectedBlog = blogArray.find((blog) => blog.slug === slug);
		this.setState({
			specificBlog: selectedBlog
		});
	};

	handleConfirm = () => {
		event.preventDefault();
		const { title, description, body, image } = this.state;
		const blogData = { title, description, body, image };
		console.log('blogData', this.state);

		this.props.createBlogAction(blogData);
		this.setState({
			creating: false
		});
	};

	handleDelete = (slug) => {
		// event.preventDefault();
		// axios
		// 	.delete(`http://127.0.0.1:8000/photography/royalframesmedia/blog/${slug}`)
		// 	.then(() => {
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
		const userToken = localStorage.getItem('token');
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
									maxLength = "500"
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
						onConfirm={this.handleDelete(specificBlog.slug)}
						confirmText="Delete"
					>
						<div className="container ">
								<div className="col-md-12">
									<p>{specificBlog.body}</p>
								</div>
								<div className="col-md-12">
									<img className="img-fluid" src={specificBlog.image_path} />
								</div>
						</div>
					</MyModal>
				)}
				{userToken && (
					<div className="hom-ctrl">
						<h4>Create Blog</h4>
						<button className="btn" onClick={this.handleCreateBlog}>
							{' '}
							Click to create
						</button>
					</div>
				)}
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
