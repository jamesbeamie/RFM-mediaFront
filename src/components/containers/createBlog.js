import React, { Component } from 'react';
import '../../assets/styles/blogModal.css';
import '../../assets/styles/blog.css';
import MyModal from '../common/modal';
import Backdrop from '../common/backdrop';
import BlogList from './blogs/BlogList';
import axios from 'axios';
import imageUploader from '../common/image';
// import loginContext from '../../common/loginContext';
import Spinner from '../common/Spinner';

class CreateBlog extends Component {
	state = {
		creating: false,
		blogArray: [],
		isLoading: false,
		specificBlog: null,
		image: '/'
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

	// static contextType = loginContext;

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

	fileHandler = () => {
		const selectFile = this.imageEl.current.value;
		imageUploader({
			image: selectFile
		}).then((response) => {
			console.log('responseyapicha', response);
			this.setState({
				// eslint-disable-next-line indent
				image: response.data.secure_url
			});
		});
	};

	handleConfirm = () => {
		this.fileHandler();
		this.setState({
			creating: false
		});
		// const image = this.imageEl.current.value;
		const title = this.titleEl.current.value;
		const description = this.descriptionEl.current.value;
		const body = this.bodyEl.current.value;

		// validation

		if (title.trim().length === 0 || description.trim().length === 0 || body.trim().length === 0) {
			return;
		}
		const picha = this.state;
		const blog = { title, description, body, picha };
		console.log('newBlog', blog);
		// const requestBody = {
		// 	query: `
		//         mutation {
		//             createBlog(blogInput: {title: "${title}", description: "${description}", tag: "${tag}"}){
		//                 _id
		// 				title
		// 				description
		// 				tag
		//             }
		//         }
		//     `
		// };

		// // get token from context

		// const token = this.context.token;
		// // acces api
		// fetch('https://royalframes-photography.herokuapp.com/photography', {
		// 	method: 'POST',
		// 	body: JSON.stringify(requestBody),
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: 'Bearer ' + token
		// 	}
		// })
		// 	.then((res) => {
		// 		if (res.status !== 200 && res.status !== 201) {
		// 			throw new Error('Error creating Blog');
		// 		}
		// 		return res.json();
		// 	})
		// 	.then((resData) => {
		// 		console.log('resData', resData);
		// 		// this.fetchHomes();
		// 		this.setState((prevState) => {
		// 			const updatedArray = [ ...prevState.blogArray ];
		// 			updatedArray.push({
		// 				_id: resData.data.createBlog._id,
		// 				title: resData.data.createBlog.title,
		// 				description: resData.data.createBlog.description,
		// 				tag: resData.data.createBlog.tag
		// 			});
		// 			return { blogArray: updatedArray };
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		const requestBody = {
			image_path: `${picha}`,
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
			// .then((response) => {
			// 	console.log('fetchedData', response.data.results);

			// 	return response.json();
			// })
			.catch((err) => {
				console.log('err', err);
			});
	};

	// fetchBlogs = () => {
	// 	this.setState({ isLoading: true });
	// 	const requestBody = {
	// 		query: `
	//             query {
	//                 blogs{
	//                     _id
	//     				title
	//     				description
	//     				tag
	//                 }
	//             }
	//         `
	// 	};

	// 	// acces api

	// 	fetch('https://royalframes-photography.herokuapp.com/photography', {
	// 		method: 'POST',
	// 		body: JSON.stringify(requestBody),
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		}
	// 	})
	// 		.then((res) => {
	// 			if (res.status !== 200 && res.status !== 201) {
	// 				throw new Error('Error fetching Blogs');
	// 			}
	// 			return res.json();
	// 		})
	// 		.then((resData) => {
	// 			console.log('fetchedData', resData);
	// 			const blogs = resData.data.blogs;
	// 			this.setState({
	// 				blogArray: blogs,
	// 				isLoading: false
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			this.setState({
	// 				isLoading: false
	// 			});
	// 		});
	// };

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
