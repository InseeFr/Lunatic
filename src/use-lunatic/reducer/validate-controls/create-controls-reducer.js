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
		return errors;
	}, {});
}

function createControlsReducer(reducer) {
	// Nothing to init
	return function (state, action) {
		const { activeControls } = state;
		const updatedState = reducer(state, action);

		if (!activeControls) return updatedState;

		const components = getComponentsFromState(updatedState);

		const errors = validateComponents(updatedState, components);

		const { pager } = state;

		return {
			...updatedState,
			errors,
			currentErrors: errors[getPageTag(pager)],
		};
	};
}

export default createControlsReducer;
