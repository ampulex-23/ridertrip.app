import * as TYPES from '../actions/types';

const initialState = {
	params: {},
	invoices: [],
	preview: null,
	count: 0
};

const lessonsReducer = (state = initialState, {
	type,	invoice, lesson, count, params, answer, index, id
}) => {
	let target;
	switch (type) {
		case TYPES.SET_INVOICE_PREVIEW:
			return { ...state, preview: invoice };
		case TYPES.CREATE_LESSONS_INVOICE:
			return { ...state, invoices: [...state.invoices, invoice] };
		case TYPES.GET_LESSONS_INSTRUCTORS:
			return { ...state, count, params };	
		case TYPES.CREATE_LESSONS_ANSWER:
			[target,] = state.invoices.filter(invoice => invoice.id === id);
			target.answers.push(answer);
			return { ...state };
		case TYPES.UPDATE_LESSONS_CHOSE:
			[target,] = state.invoices.filter(invoice => invoice.id === id);
			target.instructor = target.answers[index].instructor;
			return { ...state };
		case TYPES.UPDATE_LESSONS_LESSON:
			[target,] = state.invoices.filter(invoice => invoice.id === lesson.id);
			for (const fn in lesson) target[fn] = lesson[fn];
			return { ...state };
		default:
			return { ...state };
	}
};

export { lessonsReducer }