import { resolveComponentControls } from './validation-utils';
import { getComponentsFromState, getPageTag } from '../../commons';

function validateComponents(state, components) {
	const { pager } = state;
	return components.reduce(function (errors, component) {
		const { controls, componentType, id } = component;
		if (Array.isArray(controls)) {
			const componentErrors = resolveComponentControls(state, controls);
			const { shallowIteration } = pager;
			const idC =
				shallowIteration !== undefined ? `${id}-${shallowIteration}` : id;
			return {
				...errors,
				[idC]: componentErrors,
			};
		}
		//Thanks to init which split basic Loops, we only go into unPaginatedLoops
		if (['Loop', 'RosterForLoop'].includes(componentType)) {
			const { components } = component;
			const recurs = validateComponents(state, components);
			return {
				...((state.errors || {})[getPageTag(pager)] || {}),
				...errors,
				...recurs,
			};
		}
		// If no error we remove the possible previous errors
		return {};
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
		const { pager } = updatedState;
		const { errors = {} } = state;
		const pageTag = getPageTag(pager);
		const e = {
			...errors,
			[pageTag]: validateComponents(updatedState, components),
		};
		return {
			...updatedState,
			errors: e,
			currentErrors: e[pageTag],
		};
	};
}
export default createControlsReducer;
