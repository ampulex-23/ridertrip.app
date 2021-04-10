import {
	ADD_INVOICE, UPDATE_PROFILE,
	TOGGLE_INVOICE, UPDATE_INVOICE
} from './types';

export const updateProfile = user => ({
	type: UPDATE_PROFILE,
	payload: { user	}
});

export const addInvoice = invoice => ({
	type: ADD_INVOICE,
	payload: { invoice }
});

export const updateInvoice = invoice => ({
	type: UPDATE_INVOICE,
	payload: { invoice }
});


export const toggleInvoice = selected => ({
	type: TOGGLE_INVOICE,
	payload: { selected }
});