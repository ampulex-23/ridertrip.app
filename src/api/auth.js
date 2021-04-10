import { getHeaders, BASE_URL } from './headers';
import { Toast } from 'native-base';

const register = async ({ email, password, username }) => {
	const body = JSON.stringify({ username, email, password });
	const response = await fetch(`${BASE_URL}/auth/local/register`, {
		method: "POST", mode: 'cors',
		headers: getHeaders(false, true), body
	}).then(data => data.json());
	(response.data && response.data.jwt) && Toast.show({
		text: "User application registered. Don't forget to fill your profile.",
		buttonText: 'Ok', type: 'success', position: 'bottom', duration: 5000
	});
	!response.data && Toast.show({
		text: "Error (" + response.code + ") " + response.message,
		buttonText: 'Ok', type: 'error', position: 'bottom', duration: 5000
	});
	const { data: { user, jwt } } = response;
	return user;
};

const login = async ({ email, password = "ZxCvBnAsDf777#" }) => {
	const auth = await fetch(`${BASE_URL}/auth/local`, {
		method: "POST", mode: 'cors',
		headers: getHeaders(false, true),
		body: JSON.stringify({ identifier: email, password })
	}).then(data => data.json());
	return auth && auth.jwt ? auth : false;
};

const me = async (token) => {
	const user = await fetch(`${BASE_URL}/users/me`, {
		method: "GET", mode: 'cors',
		headers: getHeaders(token, false)
	}).then(data => data.json());
	return user && user.id ? { user, jwt: token } : false;
};
export { login, register, me }