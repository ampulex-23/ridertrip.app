import * as TYPES from '../actions/types';

const initialState = {
	resorts: [], services: [], skills: [], accredOffers: [], enums: {}, keystore: {}, theme: null
};

const listsReducer = (state = initialState, {
	type,	resorts, services, skills,
	accredOffers, enums, keystore, theme
}) => {
	switch (type) {
		case TYPES.GET_RESORTS: return { ...state, resorts };
		case TYPES.GET_SERVICES: return { ...state, services };
		case TYPES.GET_SKILLS: return { ...state, skills };
		case TYPES.GET_ENUMS: return { ...state, enums };
		case TYPES.GET_THEME: return { ...state, theme };
		case TYPES.GET_KEYSTORE: return { ...state, keystore };
		case TYPES.GET_ACRED_OFFERS: return { ...state, accredOffers };
		default: return { ...state };
	}
};

export { listsReducer }
