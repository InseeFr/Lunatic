import { resolveComponentControls } from './validation-utils';
import { getComponentsFromState, getPageTag } from '../../commons';

function validateComponentsForModal(state, components) {
	const { pager } = state;
	// TODO check components in components (Loop, etc...)
	return components.reduce(function (errors, component) {
		const { controls } = component;
		if (Array.isArray(controls)) {
			const componentErrors = resolveComponentControls(state, controls);
			if (componentErrors.length) {
				return { ...errors, [getPageTag(pager)]: componentErrors };
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
		const { activeControls, errors } = state;
		const { block } = payload;

		if (!activeControls)
			return reducer({ ...state, modalErrors: undefined }, action);
		const components = getComponentsFromState(state);
		const { modalErrors: prec } = state;

		if (block) {
			// Block the modal and stay in page so we add the error in the current page
			return {
				...state,
				modalErrors: undefined,
				currentErrors: prec[getPageTag(state.pager)],
			};
		}

		if (prec) {
			return reducer({ ...state, modalErrors: undefined }, action);
		}

		const modalErrors = validateComponentsForModal(state, components);
		if (isErrors(modalErrors)) {
			return {
				...state,
				modalErrors,
				errors: { ...errors, ...modalErrors },
			};
		}

		return reducer({ ...state, modalErrors: undefined }, action);
	};
}

export default createModalControlsReducer;
