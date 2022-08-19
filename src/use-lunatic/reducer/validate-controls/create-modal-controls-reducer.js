import { resolveComponentControls } from './validation-utils';
import { getComponentsFromState } from '../../commons';

function validateComponentsForModal(state, components) {
	// TODO check components in components (Loop, etc...)
	return components.reduce(function (errors, component) {
		const { controls, id } = component;
		if (Array.isArray(controls)) {
			const componentErrors = resolveComponentControls(state, controls);
			if (componentErrors.length) {
				return { ...errors, [id]: componentErrors };
			}
		}
		return errors;
	}, {});
}

export function isErrors(errors) {
	if (errors) {
		return Object.keys(errors).length > 0;
	}
	return false;
}

function createModalControlsReducer(reducer) {
	// Nothing to init
	return function (state, action) {
		const { payload } = action;
		const { activeControls } = state;
		const { block } = payload;

		if (!activeControls)
			return reducer({ ...state, modalErrors: undefined }, action);
		const components = getComponentsFromState(state);
		const { modalErrors: prec } = state;

		if (block) {
			return { ...state, modalErrors: undefined };
		}

		if (prec) {
			return reducer({ ...state, modalErrors: undefined }, action);
		}

		const modalErrors = validateComponentsForModal(state, components);
		if (isErrors(modalErrors)) {
			return { ...state, modalErrors };
		}

		return reducer({ ...state, modalErrors: undefined }, action);
	};
}

export default createModalControlsReducer;
