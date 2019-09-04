/* eslint-disable react/prop-types */
import React from 'react';
import PotraitItem from './PotraitItem';
import '../../../assets/styles/blogList.css';

const PotraitList = (props) => {
	// can also use () then call this.props
	const fetchedPotraits = props.potraits.map((blog) => {
		console.log('blogths', props);
		return <PotraitItem key={blog.id} blogId={blog.id} image_path={blog.image_path} />;
	});
	return <ul className="home_list">{fetchedPotraits}</ul>;
};

export default PotraitList;
