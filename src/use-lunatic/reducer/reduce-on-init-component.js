import { COMPONENT_NAMES } from '../../components';

function reduceOnInitComponent(state, action) {
	const { payload } = action;
	const { name } = payload;
	switch (name) {
		case COMPONENT_NAMES.RosterForLoop:
			return state;
		default:
			return state;
	}
}

export default reduceOnInitComponent;
