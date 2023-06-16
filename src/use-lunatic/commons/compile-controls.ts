import { isLoopComponent } from '../reducer/commons';
import { resolveComponentControls } from '../reducer/resolve-component-controls';
import { replaceComponentSequence } from '../replace-component-sequence';
import {
	LunaticComponentDefinition,
	LunaticError,
	LunaticState,
} from '../type';
import { Criticality, TypeOfControl } from '../type-source';
import fillComponentExpressions from './fill-components/fill-component-expressions';
import getComponentsFromState from './get-components-from-state';
import getErrorsWithoutEmptyValue from './get-errors-without-empty-value';

export type StateForControls = Pick<
	LunaticState,
	'pager' | 'pages' | 'isInLoop' | 'executeExpression'
>;

/**
 * Check if components of current page have errors
 */
function validateComponents(
	state: StateForControls,
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
				...errors,
				...recurs,
			});
		}
		// Keep previous errors to allow multiple controls in same page (multiple question/component in the same page)
		return errors;
	}, {});
}

function isCriticalErrors(errors?: Record<string, LunaticError[]>): boolean {
	if (errors) {
		return Object.values(errors)
			.flat()
			.reduce(function (status, { criticality, typeOfControl }) {
				return (
					status ||
					typeOfControl === TypeOfControl.FORMAT ||
					criticality.startsWith(Criticality.ERROR)
				);
			}, false);
	}
	return false;
}

function computeErrors(state: StateForControls) {
	const components = replaceComponentSequence(getComponentsFromState(state));
	const componentFiltered = components
		.map(function (component) {
			return fillComponentExpressions(component, state);
		})
		.filter(({ conditionFilter }) => {
			return conditionFilter ?? true;
		});
	const errors = validateComponents(state, componentFiltered);
	const currentErrors = Object.keys(errors).length > 0 ? errors : undefined;
	const isCritical = isCriticalErrors(currentErrors);
	return { currentErrors, isCritical };
}

export default computeErrors;
