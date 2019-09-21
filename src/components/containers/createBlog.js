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
			bumpArray: [],
			childrenArray: [],
			engagementArray: [],
			familyArray: [],
			potraitArray: [],
			isLoading: false,
			specificBlog: null,
			title: '',
			tag: '',
			description: '',
			body: '',
			image: null,
			url: '',
			mapicha: [],
			blogImages: [],
			progress: 0
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
		this.fetchBumps();
		this.fetchChundren();
		this.fetchEngagements();
		this.fetchFamily();
		this.fetchPotraits();
		setTimeout(() => {
			this.pickImage();
		}, 1000);
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
				const progressBar = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				this.setState({
					progress: progressBar
				});
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
		const { blogArray, mapicha } = this.state;
		let foundImages = [];
		mapicha.map((moja) => {
			if (moja.title === slug) {
				foundImages.push(moja.image_path);
				console.log('machi-machi', foundImages);
				this.setState({
					blogImages: foundImages
				});
			}
		});

		const selectedBlog = blogArray.find((blog) => blog.slug === slug);
		this.setState({
			specificBlog: selectedBlog
		});
	};

	pickImage = () => {
		const { bumpArray, childrenArray, engagementArray, familyArray, potraitArray } = this.state;
		console.log('iko-mimba', bumpArray);
		let allImages = [];
		bumpArray.map((moja) => {
			console.log('kamoja', moja.title);
			allImages.push(moja);
		});
		childrenArray.map((moja) => {
			console.log('kamoja', moja.title);
			allImages.push(moja);
		});
		engagementArray.map((moja) => {
			console.log('kamoja', moja.title);
			allImages.push(moja);
		});
		familyArray.map((moja) => {
			console.log('kamoja', moja.title);
			allImages.push(moja);
		});
		potraitArray.map((moja) => {
			console.log('kamoja', moja.title);
			allImages.push(moja);
		});
		console.log('imageCollection', allImages);
		this.setState({
			mapicha: allImages
		});
	};

	handleConfirm = () => {
		event.preventDefault();
		const { title, tag, description, body, image } = this.state;
		const blogData = { title, tag, description, body, image };
		console.log('blogData', this.state);

		this.props.createBlogAction(blogData);
		this.setState({
			creating: false
		});
	};

	handleDelete = (slug) => {
		// event.preventDefault();
		// axios
		// 	.delete(`https://royalframesmedia-api.herokuapp.com/photography/royalframesmedia/blog/${slug}`)
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
			.get('https://royalframesmedia-api.herokuapp.com/photography/royalframesmedia/blog/')
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
	fetchBumps = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('https://royalframesmedia-api.herokuapp.com/photography/royalframesmedia/bump/')
			.then((response) => {
				console.log('mimba', response.data.results);
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
	fetchChundren = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('https://royalframesmedia-api.herokuapp.com/photography/royalframesmedia/children')
			.then((response) => {
				console.log('chundren', response.data.results);
				const blogs = response.data.results;
				this.setState({
					childrenArray: blogs,
					isLoading: false
				});
				return response.json();
			})
			.catch((err) => {
				console.log('err', err);
			});
	};
	fetchEngagements = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('https://royalframesmedia-api.herokuapp.com/photography/royalframesmedia/engagements/')
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
	fetchFamily = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('https://royalframesmedia-api.herokuapp.com/photography/royalframesmedia/family')
			.then((response) => {
				console.log('response', response.data.results);
				const blogs = response.data.results;
				this.setState({
					familyArray: blogs,
					isLoading: false
				});
				return response.json();
			})
			.catch((err) => {
				console.log('err', err);
			});
	};
	fetchPotraits = () => {
		this.setState({ isLoading: true });

		// acces api
		axios
			.get('https://royalframesmedia-api.herokuapp.com/photography/royalframesmedia/potraits/')
			.then((response) => {
				console.log('response', response.data.results);
				const blogs = response.data.results;
				this.setState({
					potraitArray: blogs,
					isLoading: false
				});
				return response.json();
			})
			.catch((err) => {
				console.log('err', err);
			});
	};
	render() {
		const { creating, blogArray, progress, blogImages, isLoading, specificBlog } = this.state;
		const userToken = localStorage.getItem('token');
		console.log('specificBlog', specificBlog);

		const picha = blogImages.map((moja) => {
			console.log('kapicha-kamue', moja);
			return <img key={moja.slug} className="img-fluid my-2" src={moja} />;
			// allImages.push(moja);
		});
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
							<progress value={progress} max="100" />
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
								<label htmlFor="tag">tag</label>
								<input
									placeholder="tag here"
									type="text"
									name="tag"
									onChange={this.onChange}
									value={this.state.tag}
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
									maxLength="500"
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
						tag={specificBlog.tag}
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleDelete(specificBlog.slug)}
						confirmText="Delete"
					>
						<div className="container ">
							<div className="row">
								<div className="col-md-12 text-center fonti">
									<p className="text-center">{specificBlog.description}</p>
									<p className="text-center">{specificBlog.body}</p>

									<p className="deti">
										Created: {new Date(specificBlog.created_at).toLocaleDateString()}
									</p>
									<p className="deti">
										updated: {new Date(specificBlog.updated_at).toLocaleDateString()}
									</p>
								</div>
								<div className="col-md-12">
									<img className="img-fluid" src={specificBlog.image_path} />
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 my-2">{picha}</div>
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

const mapStateToProps = (state) => ({
	newBlog: state.blogReducer.newBlog,
	blogs: state.blogReducer.blogs.data
});
export default connect(mapStateToProps, { createBlogAction })(CreateBlog);
