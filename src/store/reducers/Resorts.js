const resortsReducer = (state = {
	resorts: [],
	current: null
}, action) => {
	switch (action.type) {
		case "STORE_RESORTS":
			return { ...state, resorts: action.resorts };
		case "SET_RESORT":
			return { ...state, resort: action.current };
		default:
			return state;
	}
};
export { resortsReducer }