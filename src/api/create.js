import { BASE_URL, getHeaders } from "./headers";
import { Toast } from "native-base";

const createInvoice = async ({jwt, user, invoice}) => {
	if (!jwt || !user) { return false; }
	const {
		resort, spot,
		date,	time, clients, hours,
		need, totrain, tolead, comment
	} = invoice;
	const body = JSON.stringify({
		type: 'Invoice', status: 'Invoice',
		need, tolead, totrain, comment,
		lessonDate: date,	lessonTime: time + ":00.000",
		clientsCount: +clients,	lessonDuration: +hours,
		answers: [], ownerClient: user.id, clients: [ user.id ],
		code: ('' + Date.now()).substr(4),
		...(resort ? { resort: resort.id } : { resort: 0 }),
		...(spot ? { spot: spot.id } : {}),
	});
	const headers = getHeaders(jwt, true);
	const response = await fetch(
		`${BASE_URL}/lessons`, {method: "POST", mode: 'cors', headers, body})
		.then(data => data.json());
	response.id && await Toast.show({
		text: "Invoice published.",
		buttonText: 'Ok', type: 'success', position: 'bottom', duration: 5000
	});
	!response.id && await Toast.show({
		text: "Error (" + response.code + ") " + response.message,
		buttonText: 'Ok', type: 'error', position: 'bottom', duration: 5000
	});
	return response;
};

const createClient = async ({jwt, user, data, notify = false}) => {
	if (!jwt || !user || !!user.client) { return false; }
	const response = await fetch(`${BASE_URL}/clients`, {
		method: "POST", mode: 'cors', headers: getHeaders(jwt, true),
		body: JSON.stringify({ user: user.id, ...data })
	}).then(data => data.json());
	if (response.id) {
		notify && Toast.show({
			text: "Client's card created..",
			buttonText: 'Ok',	type: 'success', position: 'bottom', duration: 5000
		});
		return response;
	} else {
		notify && Toast.show({
			text: "Error (" + response.code + ") " + response.message,
			buttonText: 'Ok',	type: 'error', position: 'bottom', duration: 5000
		});
		return null;
	}
};

export { createInvoice, createClient }