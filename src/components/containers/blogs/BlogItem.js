/* eslint-disable react/prop-types */
import React from 'react';
import '../../../assets/styles/blogItem.css';

const BlogItem = (props) => (
	<div className="row home_list-item">
		<div key={props.blogId} className="col-md-8">
			<h5>Title: {props.title}</h5>
			<p>Body: {props.body}</p>
			<span>Created: {props.created_at}</span>
			<br/>
			<span>updated: {props.updated_at}</span>
			<div>
				<React.Fragment>
					<p>owner</p>
					<button className="btn" onClick={props.specificBlog.bind(this, props.blogId)}>
						read
					</button>
				</React.Fragment>
			</div>
		</div>
		<div className="col-md-4 text-left">
			<img className="img-fluid" src={props.image_path} />
		</div>
	</div>
);

export default BlogItem;
