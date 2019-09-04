/* eslint-disable react/prop-types */
import React from 'react';
import BumpItem from './BumpItem';
import '../../../assets/styles/blogList.css';

const BumpList = (props) => {
	// can also use () then call this.props
	const fetchedBumps = props.bumps.map((blog) => {
		console.log('blogths', props);
		return <BumpItem key={blog.id} blogId={blog.id} image_path={blog.image_path} />;
	});
	return <ul className="home_list">{fetchedBumps}</ul>;
};

export default BumpList;
