import React from 'react';
import '../../../assets/styles/blogItem.css';

const BlogItem = (props) => (
	<li key={props.blogId} className="home_list-item">
		<div>
			<h3>Title: {props.title}</h3>
			<h3>Body: {props.body}</h3>
			<h3>image_path: {props.image_path}</h3>
			<h3>Created: {props.created_at}</h3>
			<h3>updated: {props.updated_at}</h3>
		</div>
		<div>
			<React.Fragment>
				<p>owner</p>
				<button className="btn" onClick={props.specificBlog.bind(this, props.blogId)}>
					read
				</button>
			</React.Fragment>
		</div>
	</li>
);

export default BlogItem;
