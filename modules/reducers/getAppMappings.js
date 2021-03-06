import AppConstants from '../constants';
import { traverseMapping } from '../../utils/mappings';

const initialState = {
	isFetching: false,
	error: undefined,
	success: false,
	rawMappings: {},
	traversedMappings: {},
};

function getAppMappings(state = initialState, action) {
	switch (action.type) {
		case AppConstants.APP.GET_MAPPINGS:
			return {
				...state,
				isFetching: true,
				error: undefined,
				success: false,
			};
		case AppConstants.APP.GET_MAPPINGS_SUCCESS:
			return {
				...state,
				isFetching: false,
				rawMappings: Object.assign({}, state.rawMappings, {
					[action.meta.appName]: action.payload,
				}),
				traversedMappings: Object.assign({}, state.traversedMappings, {
					[action.meta.appName]: traverseMapping(action.payload),
				}),
				success: true,
			};
		case AppConstants.APP.GET_MAPPINGS_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.error,
			};
		case AppConstants.APP.CLEAR_MAPPINGS: {
			const { rawMappings, traversedMappings } = state;
			delete rawMappings[action.meta.appName];
			delete traversedMappings[action.meta.appName];
			return {
				...state,
				isFetching: false,
				rawMappings: Object.assign({}, rawMappings),
				traversedMappings: Object.assign({}, traversedMappings),
				success: true,
			};
		}
		default:
			return state;
	}
}

export default getAppMappings;
