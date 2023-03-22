import { Action, ActionKind } from '../../actions';
import {
	getComponentsFromState,
	getErrorsWithoutEmptyValue,
	getPageTag,
} from '../../commons';
import {
	LunaticComponentDefinition,
	LunaticError,
	LunaticState,
} from '../../type';
import { isLoopComponent } from '../commons';
import { resolveComponentControls } from './validation-utils';

/**
 * Check if components of current page have errors
 */
function validateComponents(
	state: LunaticState,
	components: LunaticComponentDefinition[]
): Record<string, LunaticError[]> {
	const { pager } = state;
	return components.reduce(function (errors, component) {
		const { controls, componentType, id } = component;
		if (Array.isArray(controls)) {
			const componentErrors = resolveComponentControls(state, controls);
			const { shallowIteration } = pager;
			const idC =
				shallowIteration !== undefined ? `${id}-${shallowIteration}` : id;
			return getErrorsWithoutEmptyValue({
				...errors,
				[idC]: componentErrors,
			});
		}
		//Thanks to init which split basic Loops, we only go into unPaginatedLoops
		if (isLoopComponent(component)) {
			const { components } = component;
			const recurs = validateComponents(state, components);
			return getErrorsWithoutEmptyValue({
				...((state.errors || {})[getPageTag(pager)] || {}),
				...errors,
				...recurs,
			});
		}
		// Keep previous errors to allow multiple controls in same page (multiple question/component in the same page)
		return errors;
	}, {});
}

function computeErrors(state: LunaticState) {
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

/**
 * Wrap the reducer to add controls (errors / currentErrors)
 */
function createControlsReducer<T extends Action>(
	reducer: (state: LunaticState, action: T) => LunaticState
) {
	// Nothing to init
	return function (state: LunaticState, action: T): LunaticState {
		const { activeControls } = state;
		const { payload } = action;

		// if block in payload, we want to stay in current page, so we do nothing (only in goNext case)
		if (
			action.type === ActionKind.GO_NEXT_PAGE &&
			'block' in payload &&
			payload.block
		) {
			return state;
		}

		if (!activeControls) {
			// if no activeControls, skip computingErrors and fire the next action
			return reducer(state, action);
		} else {
			// update state (with handleChange for example), then update state with errors
			const updatedState = reducer(state, action);
			return computeErrors(updatedState);
		}
	};
}
export default createControlsReducer;
