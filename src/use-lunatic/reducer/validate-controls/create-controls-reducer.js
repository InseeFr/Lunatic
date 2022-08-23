import { resolveComponentControls } from './validation-utils';
import { getComponentsFromState, getPageTag } from '../../commons';

function validateComponents(state, components) {
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
		// If no error we remove the possible previous errors
		return { ...errors, [getPageTag(pager)]: [] };
	}, {});
}

function createControlsReducer(reducer) {
	// Nothing to init
	return function (state, action) {
		const { activeControls } = state;
		const updatedState = reducer(state, action);
		if (
			!activeControls ||
			state.pager.lastReachedPage !== updatedState.pager.lastReachedPage
		)
			//if no active controls or is the first time we reach the page
			return { ...updatedState, currentErrors: undefined };
		const components = getComponentsFromState(updatedState);

		const errors = {
			...state.errors,
			...validateComponents(updatedState, components),
		};
		const { pager } = updatedState;
		return {
			...updatedState,
			errors,
			currentErrors: errors[getPageTag(pager)],
		};
	};
}
export default createControlsReducer;
