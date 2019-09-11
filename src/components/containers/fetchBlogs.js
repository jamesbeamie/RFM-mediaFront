import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/styles/blogModal.css';
import '../../assets/styles/blog.css';
import MyModal from '../common/modal';
import Backdrop from '../common/backdrop';
import BlogList from './blogs/BlogList';
// import axios from 'axios';
import createBlogAction from '../actions/createBlog';
import fetchBlogAction from '../actions/fetchBlogs';
// import imageUploader from '../common/image';
import { storage } from '../../firebase';
import Spinner from '../common/Spinner';

class Blogs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// creating: false,
			blogArray: [],
			// isLoading: false,
			// specificBlog: null,
			title: '',
			description: '',
			body: '',
			image: null,
			url: ''
		};

		// this.handleUpload = this.handleUpload.bind(this);
	}
	componentDidMount = () => {
		this.props.fetchBlogAction();
	};

	render() {
		console.log('ptopu', this.props);
		const blogItems = this.props.blogs.map((blog) => (
			<div key={blog.id}>
				<h1>{blog.title}</h1>
			</div>
		));
		return <div>{blogItems}</div>;
	}
}

const mapStateToProps = (state) => ({
	blogs: state.blogReducer.blogs
});
export default connect(mapStateToProps, { fetchBlogAction })(Blogs);
