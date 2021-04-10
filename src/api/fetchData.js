import { BASE_URL, getHeaders } from './headers';

const fetchResorts = async (token = false) => {
	const headers = getHeaders(token, true);
	const config = {method: "GET", headers, mode: 'cors'};
	const resorts =	await fetch(`${BASE_URL}/resorts`, config).then(data => data.json());
	return 'code' in resorts ? [] : resorts;
};

const fetchInvoices = async (token) => {
	const headers = getHeaders(token, true);
	const config = {method: "GET", headers, mode: 'cors'};
	if (!token) {return [];}
	const invoices = await fetch(`${BASE_URL}/lessons`, config)
		.then(data => data.json());
	return 'code' in invoices ? [] : invoices;
};

const fetchCoach = async (token, id) => {
	if (!token || !id) { return false; }
	const headers = getHeaders(token, true);
	const config = {method: "GET", headers, mode: 'cors'};
	const coach = await fetch(`${BASE_URL}/instructors/${id}`, config)
		.then(data => data.json());
	return coach.id ? coach : false;
};

const fetchCoaches = async (token) => {
	if (!token) { return false; }
	const headers = getHeaders(token, true);
	const config = {method: "GET", headers, mode: 'cors'};
	const coaches = await fetch(`${BASE_URL}/instructors`, config)
		.then(data => data.json());
	return !coaches.code ? coaches : [];
};

export { fetchResorts, fetchInvoices, fetchCoach, fetchCoaches }