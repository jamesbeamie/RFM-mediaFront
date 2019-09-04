/* eslint-disable react/prop-types */
import React from 'react';
import EngagementItem from './EngagementItem';
import '../../../assets/styles/blogList.css';

const EngagementList = (props) => {
	// can also use () then call this.props
	const fetchedEngagements = props.engagements.map((blog) => {
		console.log('blogths', props);
		return <EngagementItem key={blog.id} blogId={blog.id} image_path={blog.image_path} />;
	});
	return <ul className="home_list">{fetchedEngagements}</ul>;
};

export default EngagementList;
