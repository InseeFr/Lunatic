import type { LunaticComponentDefinition, LunaticState } from '../../type';
import { type DeepTranslateExpression } from './fill-component-expressions';
import fillComponents from './fill-components';
import { setAtIndex } from '../../../utils/array';

/**
 * Fill props for roundabout
 * - expressions, VTL that states the level of completion for each iteration
 */
function fillRoundaboutProps(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Roundabout'>>,
	state: Pick<LunaticState, 'executeExpression'>
) {
	const { iterations, expressions } = component;
	const compiled = Object.entries(expressions).reduce(function (
		result,
		[name, expression]
	) {
		const values = new Array(iterations).fill(null).map((_, iteration) => {
			return state.executeExpression(expression, { iteration });
		});
		return { ...result, [name]: values };
	},
	{});
	return { ...component, expressions: compiled };
}

/**
 * Fill child components for nested component type
 */
function fillChildComponents(
	component: DeepTranslateExpression<
		LunaticComponentDefinition<'ComponentSet'>
	>,
	state: LunaticState
) {
	return {
		...component,
		components: fillComponents(component.components, state),
	};
}

/**
 * For loops, inject a method to retrieve component at a specific iteration
 */
function fillChildComponentsWithIteration(
	component: DeepTranslateExpression<
		LunaticComponentDefinition<'Loop' | 'RosterForLoop'>
	> & {
		value?: Record<string, unknown[]>;
	},
	state: LunaticState
) {
	return {
		...component,
		getComponents: (iteration: number) =>
			fillComponents(component.components, {
				...state,
				handleChange: (response, value) => {
					state.handleChange(
						response,
						setAtIndex(component.value?.[response.name] ?? [], iteration, value)
					);
				},
				pager: {
					...state.pager,
					iteration: iteration,
					subPage: 0, // Fake a subpage to simulate an iteration
				},
			}),
	};
}

/**
 * Fill component specific props (RoundAbout for instance)
 */
function fillSpecificExpressions(
	component: DeepTranslateExpression<LunaticComponentDefinition>,
	state: LunaticState
) {
	switch (component.componentType) {
		case 'Roundabout':
			return fillRoundaboutProps(component, state);
		case 'ComponentSet':
			return fillChildComponents(component, state);
		case 'Loop':
		case 'RosterForLoop':
			return fillChildComponentsWithIteration(component, state);
		default:
			return component;
	}
}

export default fillSpecificExpressions;
