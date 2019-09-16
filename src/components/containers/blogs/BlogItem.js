/* eslint-disable react/prop-types */
import React from 'react';
import '../../../assets/styles/blogItem.css';

const BlogItem = (props) => (
	<div className="row home_list-item">
		<div className="col-md-4 text-right">
			<img className="img-fluid" src={props.image_path} />
		</div>
		<div key={props.blogId} className="col-md-8">
			<h5>Title: {props.title}</h5>
			<p>Body: {props.body}</p>
			<p>Created: {props.created_at}</p>
			<p>updated: {props.updated_at}</p>
			<div>
				<React.Fragment>
					<button className="btn" onClick={props.specificBlog.bind(this, props.slug)}>
						read
					</button>
				</React.Fragment>
			</div>
		</div>
	</div>
);

export default BlogItem;
