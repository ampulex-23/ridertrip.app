import { getHeaders, BASE_URL as apiUrl } from './headers';
import store from '../store/store';
import * as TYPES from '../store/actions/types';

const mode = 'cors';

const register = async ({ phoneNumber, role = 'client' }) => {
	const body = JSON.stringify({ phoneNumber });
	const headers = getHeaders(false, true);
	const method = 'POST';
	try {
		const { user, os } = await (
			await fetch(
				`${apiUrl}/users/register/${role}`,
				{ method, mode, headers, body }
			)
		).json();
		store.dispatch({
			type: TYPES.CREATE_USERS_REGISTER,
			user, os
		});
		return { user, os };
	} catch (error) {
		throw error;
	}
};

const access = async ({ id }) => {
	const headers = getHeaders(false, true);
	const method = 'POST';
	try {
		const { user, jwt } = await (
			await fetch(
				`${apiUrl}/users/access/${id}`,
				{ method, mode, headers }
			)
		).json();
		store.dispatch({
			type: TYPES.GET_USERS_ACCESS,
			user, jwt
		});
		return { user, jwt };
	} catch(error) {
		throw error;
	}
};

const me = async () => {
	const { auth: { jwt } } = store.getState();
	const headers = getHeaders(jwt, false);
	const method = 'GET';
	try {
		const user = await (
			await fetch(`${apiUrl}/users/me`, {	method, mode, headers })
		).json();
		if (user.role.name === 'Client') {
			user.client = await (
				await fetch(`${apiUrl}/users/me/client`, { method, mode, headers })
			).json();
		} else {
			user.instructor = await (
				await fetch(`${apiUrl}/users/me/instructor`, { method, mode, headers })
			).json();
		}
		store.dispatch({ type: TYPES.GET_USERS_ME, user	});
		return user;
	} catch (error) {
		throw error;		
	}
};

const update = async (path = '', id, changes = {}) => {
	const method = 'PUT';
	const { auth: { jwt } } = store.getState();
	const headers = getHeaders(jwt, false);
	const url = `${apiUrl}/users/me${path}`;
	const body = JSON.stringify({ ...changes, id });
	try {
		const updated = await (
			await fetch(url, { method, mode, headers, body })
		).json();
		const PATH = path.replace('/', '_').toUpperCase();
		store.dispatch({
			type: TYPES.UPDATE_USERS_ME + PATH
		})
		return updated;	
	} catch (error) {
		throw error;
	}
};

export { access, register, me, update }