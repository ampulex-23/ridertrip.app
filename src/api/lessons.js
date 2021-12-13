import { getHeaders, BASE_URL as apiUrl } from './headers';
import store from '../store';
import * as TYPES from '../store/actions/types';

const mode = 'cors';

const invoice = async params => {
	try {
		const { auth: { jwt, user: { client, client: { lessons } } } } = store.getState();
		const headers = getHeaders(jwt, true);
		const method = 'POST';
		const body = JSON.stringify(params);
		const url = `${apiUrl}/lessons/invoice`;
		console.warn(body);
		const invoice = await (
			await fetch(url, { method, mode, headers, body })
		).json();
		store.dispatch({ 
			type: TYPES.UPDATE_USERS_ME_CLIENT, 
			client: { 
				...client, 
				lessons: [...client.lessons, invoice] 
			} 
		});
		return invoice;
	} catch (error) {
		throw error;
	}
};

const answer = async (id, price = null) => {
	try {
		const { auth: { jwt, user: { instructor, instructor: { lessons } } } } = store.getState();
		const headers = getHeaders(jwt, false);
		const method = 'POST';
		const body = JSON.stringify(
			price !== null
				? { instructor, price } 
				: { instructor }
		);
		const url = `${apiUrl}/lessons/${id}/answer`;
		const invoice = await (
			await fetch(url, { method, mode, headers, body })
		).json();
		lessons.filter(l => l.id === id)
			.pop()?.answers.push(invoice.answers.pop());
		store.dispatch({ type: TYPES.UPDATE_USERS_ME_INSTRUCTOR, instructor });
		return invoice;
	} catch (error) {
		throw error;
	}
};

const chose = async (id, answer = 0) => {
	try {
		const { auth: { jwt, user: { client, client: { lessons } } } } = store.getState();
		const headers = getHeaders(jwt, false);
		const method = 'POST';
		const body = JSON.stringify({ answer });
		const url = `${apiUrl}/lessons/${id}/chose`;
		const invoice = await (
			await fetch(url, { method, mode, headers, body })
		).json();
		const updated = lessons.filter(l => l.id === id).pop();
		if (updated) {
			updated.instructor = invoice.answers[answer].instructor;
			updated.status = 'hascoach';
			updated.totaldue = invoice.answers[answer].price * 
				updated.duration * updated.persons;
		}
		store.dispatch({ type: TYPES.UPDATE_USERS_ME_CLIENT, client });
		return invoice;
	} catch (error) {
		throw error;
	}
};

export { invoice, answer, chose }
