// import { toast } from "react-toastify";
// import urlPath from "../../api/axiosConfig";
// import {
//   DELETE_ARTICLE_SUCCESS,
//   DELETE_ARTICLE_REQUEST,
//   DELETE_ARTICLE_ERROR
// } from "../types";

// const deleteArticleSuccess = () => ({
//   type: DELETE_ARTICLE_SUCCESS
// });

// const deleteArticleError = payload => ({
//   type: DELETE_ARTICLE_ERROR,
//   payload: payload
// });

// const deleteArticleRequest = () => ({
//   type: DELETE_ARTICLE_REQUEST,
//   isLoading: true
// });

// export const deleteArticle = (slug) => (dispatch) => {
//   dispatch(deleteArticleRequest());
//   urlPath
//     .delete(`/api/v1/articles/${slug}/`)
//     .then(response => {
//       dispatch(deleteArticleSuccess());
//       toast.success("Article Deleted Successfully");
//     })
//     .catch(err => {
//       dispatch(deleteArticleError(err.response.data));
//       if (err.response.data) {
//         toast.error(err.response.data.message);
//       }
//     });
// };

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
			// .then((res) => res.json())
			.then(
				(deletedata) =>
					dispatch({
						type: DELETE_BLOG_SUCCESS,
						payload: deletedata
					}),
				toast.success('Article Deleted Successfully')
			)
			.catch((err) =>
				dispatch({
					type: DELETE_BLOG_FAILED,
					payload: err
                }),
                toast.error("error datamessage")
			)
	);
};
export default deleteBlogAction;
