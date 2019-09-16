import { combineReducers } from 'redux';

import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import blogReducer from './blogReducer';
import bumpReducer from './bumpReducer';
import childrenReducer from './childrenReducer';
import engagementReducer from './engagementReducer';
import familyReducer from './familyReducer';
import potraitReducer from './potraitReducer';
import deleteBlogReducer from './deleteBlogReducer';
import singleBlogReducer from './singleBlogReducer';

const rootReducer = combineReducers({
	signUpReducer,
	signInReducer,
	blogReducer,
	bumpReducer,
	childrenReducer,
	engagementReducer,
	familyReducer,
	potraitReducer,
	deleteBlogReducer,
	singleBlogReducer
});

export default rootReducer;
