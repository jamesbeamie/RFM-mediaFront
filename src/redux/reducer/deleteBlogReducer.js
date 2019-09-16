import { DELETE_BLOG_SUCCESS, DELETE_BLOG_FAILED } from '../../components/actions/types';

const initialState = {};

const deleteBlogReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_BLOG_SUCCESS:
			return {
				...state
			};
		case DELETE_BLOG_FAILED:
			return {
				...state,
				isLoading: true
			};
		default:
			return state;
	}
};

export default deleteBlogReducer;
