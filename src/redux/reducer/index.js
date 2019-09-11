import { combineReducers } from 'redux';

import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import blogReducer from './blogReducer';
import bumpReducer from './bumpReducer';

const rootReducer = combineReducers({
	signUpReducer,
	signInReducer,
	blogReducer,
	bumpReducer
});

export default rootReducer;
