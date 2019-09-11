import { combineReducers } from 'redux';

import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import blogReducer from './blogReducer';

const rootReducer = combineReducers({
	signUpReducer,
	signInReducer,
	blogReducer
});

export default rootReducer;
