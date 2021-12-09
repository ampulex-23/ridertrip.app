import {
	CREATE_LESSONS_ANSWER, CREATE_LESSONS_INVOICE, CREATE_USERS_ME_ACRED,
	CREATE_USERS_REGISTER, GET_ACRED_OFFERS, GET_ENUMS, GET_EVENTS_EVENT,
	GET_KEYSTORE, GET_LESSONS_INSTRUCTORS, GET_LESSONS_LESSON, GET_RESORTS,
	GET_SERVICES, GET_SKILLS, GET_USERS_ACCESS, GET_USERS_ME, GET_USERS_ME_ACREDS,
	GET_USERS_ME_EVENTS, GET_USERS_ME_INSTRUCTOR,GET_USERS_ME_LESSONS, 
	GET_USERS_ME_LICENSE, UPDATE_LESSONS_CHOSE, UPDATE_USERS_ME_INSTRUCTOR,
	UPDATE_LESSONS_LESSON, UPDATE_USERS_ME,	UPDATE_USERS_ME_CLIENT, 
	CREATE_USERS_ME_LICENSE
} from './types';

export const fetchResorts = () => ({ type: GET_RESORTS,	payload: {} });
export const fetchServices = () => ({ type: GET_SERVICES,	payload: {} });
export const fetchSkills = () => ({ type: GET_SKILLS,	payload: {} });
export const fetchEnums = () => ({ type: GET_ENUMS,	payload: {} });
export const fetchKeystore = () => ({ type: GET_KEYSTORE,	payload: {} });
export const fetchAcredOffers = () => ({ type: GET_ACRED_OFFERS,	payload: {} });
export const register = ({ phoneNumber, email }) => ({
	type: CREATE_USERS_REGISTER,
	payload: { phoneNumber, email }
});
export const access = ({ id }) => ({
	type: GET_USERS_ACCESS,
	payload: { id }
});
export const fetchMe = () => ({
	type: GET_USERS_ME,
	payload: {}
});
export const updateMe = user => ({
	type: UPDATE_USERS_ME,
	payload: user
});
export const fetchMeClient = () => ({
	type: GET_USERS_ME_CLIENT,
	payload: {}
});
export const updateMeClient = client => ({
	type: UPDATE_USERS_ME_CLIENT,
	payload: client
});
export const fetchMeInstructor = () => ({
	type: GET_USERS_ME_INSTRUCTOR,
	payload: {}
});
export const updateMeInstructor = client => ({
	type: UPDATE_USERS_ME_INSTRUCTOR,
	payload: client
});
export const fetchMeLessons = () => ({
	type: GET_USERS_ME_LESSONS,
	payload: {}
});
export const fetchMeEvents = () => ({
	type: GET_USERS_ME_EVENTS,
	payload: {}
});
export const fetchMeLicense = () => ({
	type: GET_USERS_ME_LICENSE,
	payload: {}
});
export const createMeLicense = license => ({
	type: CREATE_USERS_ME_LICENSE,
	payload: license
});
export const fetchMeAcreds = () => ({
	type: GET_USERS_ME_ACREDS,
	payload: {}
});
export const createMeAcred = acred => ({
	type: CREATE_USERS_ME_ACRED,
	payload: acred
});
export const createInvoice = invoice => ({
	type: CREATE_LESSONS_INVOICE,
	payload: invoice
});
export const createAnswer = ({ id, price }) => ({
	type: CREATE_LESSONS_ANSWER,
	payload: { id, price }
});
export const updateChose = ({ id, index }) => ({
	type: UPDATE_LESSONS_CHOSE,
	payload: { id, index }
});
export const updateLesson = lesson => ({
	type: UPDATE_LESSONS_LESSON,
	payload: lesson
});
export const fetchLesson = ({ id }) => ({
	type: GET_LESSONS_LESSON,
	payload: { id }
});
export const fetchEvent = ({ id }) => ({
	type: GET_EVENTS_EVENT,
	payload: { id }
});
export const fetchInvoiceCount = invoice => ({
	type: GET_LESSONS_INSTRUCTORS,
	payload: invoice
});