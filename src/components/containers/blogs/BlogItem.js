/* eslint-disable react/prop-types */
import React from 'react';
import '../../../assets/styles/blogItem.css';

const BlogItem = (props) => (
	<div className="row home_list-item">
		<div className="col-md-6 text-right furem">
			<button className="" onClick={props.specificBlog.bind(this, props.slug)}>
				<img className="img-fluid" src={props.image_path} />
			</button>
		</div>
		<div key={props.blogId} className="col-md-6">
			<h6>{props.title}</h6>
			<p>{props.description}</p>
			<p>{props.tag}</p>
			<p className="deti">Created: {new Date(props.created_at).toLocaleDateString()}</p>
			<p>updated: {new Date(props.updated_at).toLocaleDateString()}</p>
			<div>
				<React.Fragment />
			</div>
		</div>
	</div>
);

export default BlogItem;
