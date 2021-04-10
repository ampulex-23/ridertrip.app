import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer, {
	auth: { user: null, jwt: null },
	resorts: { resorts: [], current: null },
	lessons: { invoices: [], lessons: [], coaches: [], selected: null },
});
export default store;