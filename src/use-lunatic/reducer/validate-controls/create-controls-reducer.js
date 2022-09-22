import { resolveComponentControls } from './validation-utils';
import { getComponentsFromState, getPageTag } from '../../commons';

function validateComponents(state, components) {
	const { pager } = state;
	return components.reduce(function (errors, component) {
		const { controls, componentType } = component;
		if (Array.isArray(controls)) {
			const componentErrors = resolveComponentControls(state, controls);
			if (componentErrors.length) {
				return { ...errors, [getPageTag(pager)]: componentErrors };
			}
		}
		if (['Loop', 'RosterForLoop'].includes(componentType)) {
			const { components } = component;
			const { shallowIteration } = pager;
			const recurs = validateComponents(state, components);
			debugger;
			console.log({
				...errors,
				[getPageTag(pager)]: [
					...(errors[getPageTag(pager)] || []),
					...recurs[getPageTag(pager)],
				],
			});
			return {
				...errors,
				[getPageTag(pager)]: [
					...(errors[getPageTag(pager)] || []),
					...recurs[getPageTag(pager)],
				],
			};
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
		const { pager } = updatedState;
		debugger;
		const errors = {
			...(state.errors || {}),
			[getPageTag(pager)]: [
				...((state.errors || {})[getPageTag(pager)] || []),
				...((validateComponents(updatedState, components) || {})[
					getPageTag(pager)
				] || []),
			],
		};

		return {
			...updatedState,
			errors,
			currentErrors: errors[getPageTag(pager)],
		};
	};
}
export default createControlsReducer;
