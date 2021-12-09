import { combineReducers } from 'redux';
import { authReducer as auth } from './auth';
import { listsReducer as lists } from './lists';
import { lessonsReducer as lessons } from './lessons';

export default combineReducers({ auth,	lists, lessons });