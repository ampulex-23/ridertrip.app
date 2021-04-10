import { UPDATE_PROFILE, LOGIN, LOGOUT } from '../actions/types';

const authReducer = (state = {
	user: null,
	jwt: null
}, action) => {
	switch (action.type) {
		case LOGIN:
			return { user: action.user, jwt: action.jwt };
		case LOGOUT:
			return { user: null, jwt: null };
		case UPDATE_PROFILE:
			return { user: action.user }
		default:
			return state;
	}
};
export { authReducer }