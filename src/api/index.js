import { fetchResorts, fetchInvoices, fetchCoach, fetchCoaches } from './fetchData';
import { createInvoice, createClient } from './create';
import { me, register, login } from './auth';
import { putUser, hireUser, putInvoice } from './updateData';

export {
	me, register, login,
	putUser, hireUser, putInvoice,
	fetchResorts, fetchInvoices, fetchCoach,
	createInvoice, createClient, fetchCoaches,
}