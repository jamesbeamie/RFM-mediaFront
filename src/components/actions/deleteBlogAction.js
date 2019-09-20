import { DELETE_BLOG_SUCCESS, DELETE_BLOG_FAILED } from './types';
import urlPath from '../common/axiosConfig';
import { toast } from 'react-toastify';

const deleteBlogAction = (slug) => (dispatch) => {
	return (
		urlPath
			.request({
				method: 'delete',
				headers: {
					'content-type': 'application/json'
				},
				url: `/blog/${slug}/`
			})
			.then(
				(deletedata) =>
					dispatch({
						type: DELETE_BLOG_SUCCESS,
						payload: deletedata
					}),
				toast.success('Article Deleted Successfully')
			)
			.catch(
				(err) =>
					dispatch({
						type: DELETE_BLOG_FAILED,
						payload: err
					}),
				toast.error('error datamessage')
			)
	);
};
export default deleteBlogAction;
