const lessonsReducer = (state = {
	invoices: [],
	lessons: [],
	coaches: []
}, action) => {
	switch (action.type) {
		case "STORE_INVOICES":
			return { ...state, invoices: action.invoices };
		case "STORE_COACHES":
			return { ...state, coaches: action.coaches };
		case "ADD_INVOICE":
			return { ...state, invoices: [ ...state.invoices, action.payload.invoice ] };
		case "TOGGLE_INVOICE":
			return { ...state, selected: action.payload.selected };
		case "UPDATE_INVOICE":
			const listName = action.payload.invoice.type === 'Lesson' ?
				'lessons' : 'invoices';
			return {
				...state,
				[listName]: [
					...((state[listName] || [])
						.filter(invoice => invoice.id !== action.payload.invoice.id)),
					action.payload.invoice
				]
			};
		default:
			return state;
	}
};
export { lessonsReducer }