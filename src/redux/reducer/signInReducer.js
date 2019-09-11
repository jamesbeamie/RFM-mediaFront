import { SIGNIN_SUCCESS, SIGNIN_FAILED } from '../../components/actions/types';
// import { act } from 'react-testing-library';

const signUpState = {
	loginUser: {}
};

const signInReducer = (state = signUpState, action) => {
	switch (action.type) {
		case SIGNIN_SUCCESS:
			return {
				...state,
				loginUser: action.payload
			};
		case SIGNIN_FAILED:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default signInReducer;
