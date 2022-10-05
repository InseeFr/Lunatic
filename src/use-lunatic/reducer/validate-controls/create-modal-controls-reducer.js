import { resolveComponentControls } from './validation-utils';
import {
	getComponentsFromState,
	getPageTag,
	getErrorsWithoutEmptyValue,
} from '../../commons';

function validateComponentsForModal(state, components) {
	const { pager } = state;
	return components.reduce(function (errors, component) {
		const { controls, componentType, id } = component;
		if (Array.isArray(controls)) {
			const componentErrors = resolveComponentControls(state, controls);
			if (componentErrors.length) {
				const { shallowIteration } = pager;
				const idC =
					shallowIteration !== undefined ? `${id}-${shallowIteration}` : id;
				return getErrorsWithoutEmptyValue({
					...errors,
					[idC]: componentErrors,
				});
			}
		}
		//Thanks to init which split basic Loops, we only go into unPaginatedLoops
		if (['Loop', 'RosterForLoop'].includes(componentType)) {
			// TODO handle the case where shallowInteration hasn't been initalized because not handleChange fired
			const { components } = component;
			const recurs = validateComponentsForModal(state, components);
			return getErrorsWithoutEmptyValue({
				...((state.errors || {})[getPageTag(pager)] || {}),
				...errors,
				...recurs,
			});
		}
		// If no error we remove the possible previous errors
		return {};
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
				currentErrors: prec,
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
