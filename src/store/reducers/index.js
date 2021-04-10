import { combineReducers } from 'redux';
import { authReducer } from './Auth';
import { resortsReducer } from './Resorts';
import { lessonsReducer } from './Lessons';

export default combineReducers({
	auth: authReducer,
	resorts: resortsReducer,
	lessons: lessonsReducer,
});