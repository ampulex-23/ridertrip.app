import { BASE_URL, getHeaders } from "./headers";
import { Toast } from "native-base";

const putUser = async ({jwt, user, data}) => {
	if (!jwt || !user) { return false; }
	const body = JSON.stringify({...user, ...data});
	const headers = getHeaders(jwt, true);
	const response = await fetch(
		`${BASE_URL}/users/${user.id}`,
		{method: "PUT", mode: 'cors', headers, body})
		.then(data => data.json());
	response.id && Toast.show({
			text: "Data saved.", buttonText: 'Ok',	type: 'success',
			position: 'bottom', duration: 5000
		});
	!response.id &&	Toast.show({
			text: "Error (" + response.code + ") " + response.message,
			buttonText: 'Ok',	type: 'error', position: 'bottom', duration: 5000
		});
	return response;
};

const hireUser = async ({jwt, invoice, answer}) => {
	const {id, price, instructor} = answer;
	const body = JSON.stringify({
		...invoice, type: 'Lesson', status: 'Scheduled',
		instructor,
		answers: [
			{ id, price, instructor },
			...invoice.answers.filter(a => a.id !== id)
		]
	});
	const headers = getHeaders(jwt, true);
	const response = await fetch(
		`${BASE_URL}/lessons/${invoice.id}`,
		{method: "PUT", mode: 'cors', headers, body})
		.then(data => data.json());
	response.id ?
		Toast.show({
			text: "Data saved.", buttonText: 'Ok',	type: 'success',
			position: 'bottom', duration: 5000
		}) :
		Toast.show({
			text: "Error (" + response.code + ") " + response.message,
			buttonText: 'Ok',	type: 'error', position: 'bottom', duration: 5000
		});
	return response;
};

const putInvoice =async ({jwt, user, invoice}) => {
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
		...(resort ? { resort: resort.id } : { resort: 0 }),
		...(spot ? { spot: spot.id } : {}),
	});
	const headers = getHeaders(jwt, true);
	const response = await fetch(
		`${BASE_URL}/lessons/${invoice.id}`, {method: "PUT", mode: 'cors', headers, body})
		.then(data => data.json());
	response.id && await Toast.show({
		text: "Changes saved.",
		buttonText: 'Ok', type: 'success', position: 'bottom', duration: 5000
	});
	!response.id && await Toast.show({
		text: "Error (" + response.code + ") " + response.message,
		buttonText: 'Ok', type: 'error', position: 'bottom', duration: 5000
	});
	return response;
};

export { putUser, hireUser, putInvoice }