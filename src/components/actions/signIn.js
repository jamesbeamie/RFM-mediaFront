import { SIGNIN_SUCCESS, SIGNIN_FAILED } from './types';
import urlPath from '../common/axiosConfig';

const signInAction = (signInData) => (dispatch) => {
	return (
		urlPath
			.request({
				method: 'post',
				headers: {
					'content-type': 'application/json'
				},
				url: '/users/login/',
				data: {
					user: {
						// username: signUpData.username,
						email: signInData.email,
						password: signInData.password
					}
				}
			})
			// .then((res) => res.json())
			.then((logindata) =>
				dispatch({
					type: SIGNIN_SUCCESS,
					payload: logindata
				}, 
				)
			)
			.catch((err) =>
				dispatch({
					type: SIGNIN_FAILED,
					payload: err
				})
			)
	);
};
export default signInAction;
