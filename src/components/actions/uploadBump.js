import { UPLOAD_BUMP_SUCCESS, UPLOAD_BUMP_FAILED } from './types';
import urlPath from '../common/axiosConfig';

const uploadBumpAction = (bumpData) => (dispatch) => {
	return urlPath
		.request({
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			url: '/bump/',
			data: {
				image_path: bumpData.image,
				title: bumpData.title.toLowerCase(),
			}
		})
		.then((blogdata) =>
			dispatch({
				type: UPLOAD_BUMP_SUCCESS,
				payload: blogdata
			})
		)
		.catch((err) =>
			dispatch({
				type: UPLOAD_BUMP_FAILED,
				payload: err
			})
		);
};
export default uploadBumpAction;
