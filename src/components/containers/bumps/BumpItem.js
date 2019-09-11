/* eslint-disable react/prop-types */
import React from 'react';
import '../../../assets/styles/blogItem.css';

const BumpItem = (props) => (
	<div key={props.blogId} className="col-md-4 ">
			<img className="img-fluid" src={props.image_path}/>
	</div>
);

export default BumpItem;
