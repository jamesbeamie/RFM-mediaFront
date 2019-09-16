import { SINGLE_BLOG_SUCCESS, SINGLE_BLOG_FAILED } from '../../components/actions/types';

const blogState = {
	blog: []
};

const singleBlogReducer = (state = blogState, action) => {
	switch (action.type) {
		case SINGLE_BLOG_SUCCESS:
			return {
				...state,
				blog: action.payload
			};
		case SINGLE_BLOG_FAILED:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default singleBlogReducer;
