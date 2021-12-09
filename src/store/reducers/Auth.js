import * as TYPES from '../actions/types';

const initialState = {
	user: null,
	jwt: null,
	os: null
};

const authReducer = (state = initialState, { 
	type, 
	user, os, jwt, client, instructor, 
	license, acreds, lessons, acred
}) => {
	switch (type) {
		case TYPES.CREATE_USERS_REGISTER:
			return { ...state, user, os };
		case TYPES.GET_USERS_ACCESS:
			return { ...state, user, jwt };
		case TYPES.GET_USERS_ME:
			return { ...state, user };
		case TYPES.GET_USERS_ME_CLIENT:
			return { ...state, user: { ...state.user, client } };
		case TYPES.GET_USERS_ME_INSTRUCTOR:
			return { ...state, user: { ...state.user, instructor } };
		case TYPES.GET_USERS_ME_LICENSE:
			return { ...state, user: { ...state.user, instructor: { ...state.user.instructor, license } } };
		case TYPES.GET_USERS_ME_ACREDS:
			return { ...state, user: { ...state.user, instructor: { ...state.user.instructor, acreds } } };
		case TYPES.GET_USERS_ME_LESSONS:
			const role = state.user.role.name.toLowerCase();
			return { ...state, user: { ...state.user,  [role]: { ...state.user[role], lessons } } };
		case TYPES.UPDATE_USERS_ME:
			return { ...state, user: { ...state.user, ...user }}
		case TYPES.UPDATE_USERS_ME_CLIENT:
			return { ...state, user: { ...state.user, client: { ...state.user.client, ...client } } };
		case TYPES.UPDATE_USERS_ME_INSTRUCTOR:
			return { ...state, user: { ...state.user, instructor: { ...state.user.instructor, ...instructor } } };
		case TYPES.CREATE_USERS_ME_LICENSE:
			return { ...state, user: { ...state.user, instructor: { ...state.user.instructor, license } } };	
		case TYPES.CREATE_USERS_ME_ACRED:
			return { ...state, user: { ...state.user, instructor: { ...state.user.instructor, acreds: [...state.user.instructor.acreds, acred] } } };
		default:
			return { ...state };
	}
};

export { authReducer }