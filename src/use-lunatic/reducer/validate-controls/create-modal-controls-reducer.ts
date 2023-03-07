import { Action } from '../../actions';
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

function validateComponentsForModal(
	state: LunaticState,
	components: LunaticComponentDefinition[]
): Record<string, LunaticError[]> {
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
		if (isLoopComponent(component)) {
			// TODO handle the case where shallowInteration hasn't been initalized because not handleChange fired
			const { components } = component;
			const recurs = validateComponentsForModal(state, components);
			return getErrorsWithoutEmptyValue({
				...((state.errors || {})[getPageTag(pager)] || {}),
				...errors,
				...recurs,
			});
		}
		// Keep previous errors to allow multiple controls in same page (multiple question/component in the same page)
		return errors;
	}, {} as Record<string, LunaticError[]>);
}

export function isErrors(errors: Record<string, LunaticError[]>): boolean {
	if (typeof errors === 'object' && errors !== null) {
		return Object.keys(errors).length > 0;
	}
	return false;
}

function createModalControlsReducer<T extends Action>(
	reducer: (state: LunaticState, action: T) => LunaticState
) {
	// Nothing to init
	return function (state: LunaticState, action: T): LunaticState {
		const { payload } = action;
		const { activeControls, errors } = state;

		if (!activeControls)
			return reducer({ ...state, modalErrors: undefined }, action);
		const components = getComponentsFromState(state);
		const { modalErrors: prec } = state;

		if ('block' in payload && payload.block) {
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
			const page = getPageTag(state.pager);
			return {
				...state,
				modalErrors,
				errors: {
					...errors,
					[page]: { ...(errors ?? {})[page], ...modalErrors },
				},
			};
		}

		return reducer({ ...state, modalErrors: undefined }, action);
	};
}

export default createModalControlsReducer;
