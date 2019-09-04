/* eslint-disable react/prop-types */
import React from 'react';
import '../../../assets/styles/blogItem.css';

const ChildrenItem = (props) => (
	<li key={props.blogId} className="home_list-item">
		<div>
			<h3>image_path: {props.image_path}</h3>
		</div>
	</li>
);

export default ChildrenItem;
