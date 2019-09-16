import { SINGLE_BLOG_SUCCESS, SINGLE_BLOG_FAILED } from './types';
import urlPath from '../common/axiosConfig';

const singleBlogAction = (slug) => (dispatch) => {
	return urlPath
		.request({
			method: 'get',
			headers: {
				'content-type': 'application/json'
			},
			url: `/blog/${slug}`
		})
		.then((blogdata) =>
			dispatch({
				type: SINGLE_BLOG_SUCCESS,
				payload: blogdata
			})
		)
		.catch((err) =>
			dispatch({
				type: SINGLE_BLOG_FAILED,
				payload: err
			})
		);
};
export default singleBlogAction;
