import { ActionCompileControls } from '../actions';
import { getComponentsFromState, getPageTag } from '../commons';
import {
	LunaticComponentDefinition,
	LunaticError,
	LunaticState,
} from '../type';
import { isLoopComponent } from './commons';
import { resolveComponentControls } from './validate-controls/validation-utils';

/**
 * Check if components of current page have errors
 */
function validateComponents(
	state: LunaticState,
	components: LunaticComponentDefinition[]
): Record<string, LunaticError[]> {
	const { pager } = state;
	return components.reduce(function (errors, component) {
		const { controls, id } = component;
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
		if (isLoopComponent(component)) {
			const { components } = component;
			const recurs = validateComponents(state, components);
			return {
				...((state.errors || {})[getPageTag(pager)] || {}),
				...errors,
				...recurs,
			};
		}
		// Keep previous errors to allow multiple controls in same page (multiple question/component in the same page)
		return errors;
	}, {});
}

/**
 * Wrap the reducer to add controls (errors / currentErrors)
 */
function reduceCompileControls(
	state: LunaticState,
	action: ActionCompileControls
): LunaticState {
	// Nothing to init
	const { activeControls } = state;
	if (
		!activeControls ||
		state.pager.lastReachedPage !== state.pager.lastReachedPage
	)
		//if no active controls or is the first time we reach the page
		return { ...state, currentErrors: undefined };
	const components = getComponentsFromState(state);
	const { pager } = state;
	const { errors } = state;
	const pageTag = getPageTag(pager);
	const e = {
		...errors,
		[pageTag]: validateComponents(state, components),
	} satisfies LunaticState['errors'];
	return {
		...state,
		errors: e,
		currentErrors: e?.[pageTag],
	};
}

export default reduceCompileControls;
