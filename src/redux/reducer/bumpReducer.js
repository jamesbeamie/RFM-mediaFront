import { UPLOAD_BUMP_SUCCESS, UPLOAD_BUMP_FAILED } from '../../components/actions/types';
// import { act } from 'react-testing-library';

const bumpState = {
	newBump: {}
};

const bumpReducer = (state = bumpState, action) => {
	switch (action.type) {
		case UPLOAD_BUMP_SUCCESS:
			return {
				...state,
				newBump: action.payload
			};
		case UPLOAD_BUMP_FAILED:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default bumpReducer;
