import { getHeaders, BASE_URL as apiUrl } from './headers';
import store from '../store/store';
import * as TYPES from '../store/actions/types';

const mode = 'cors';

const resorts = async () => {
	const { auth: { jwt } } = store.getState();
	const headers = getHeaders(jwt, false);
	const method = 'GET';
	const resorts =	await (
		await fetch(`${apiUrl}/resorts`, { method, headers, mode })
	).json();
	store.dispatch({ type: TYPES.GET_RESORTS, resorts	});
	return resorts;
};

const theme = async (key = 'LIGHT') => {
	const headers = getHeaders(null, false);
	const method = 'GET';
	const theme =	await (
		await fetch(`${apiUrl}/themes?key=${key}`, { method, headers, mode })
	).json();
	store.dispatch({ type: TYPES.GET_THEME, theme	});
	return theme;
};

const services = async () => {
	const { auth: { jwt } } = store.getState();
	const headers = getHeaders(jwt, false);
	const method = 'GET';
	const services =	await (
		await fetch(`${apiUrl}/services`, { method, headers, mode })
	).json();
	store.dispatch({ type: TYPES.GET_SERVICES, services	});
	return services;
};

const skills = async () => {
	const { auth: { jwt } } = store.getState();
	const headers = getHeaders(jwt, false);
	const method = 'GET';
	const skills =	await (
		await fetch(`${apiUrl}/skills`, { method, headers, mode })
	).json();
	store.dispatch({ type: TYPES.GET_SKILLS, skills	});
	return skills;
};

const enums = async () => {
	const { auth: { jwt } } = store.getState();
	const headers = getHeaders(jwt, false);
	const method = 'GET';
	const enums =	await (
		await fetch(`${apiUrl}/dicts`, { method, headers, mode })
	).json();
	store.dispatch({ type: TYPES.GET_ENUMS, enums	});
	return enums;
};

export { resorts, services, skills, enums, theme }