import type { LunaticComponentDefinition, LunaticState } from '../../type';
import { type DeepTranslateExpression } from './fill-component-expressions';
import fillComponents, { fillComponent } from './fill-components';
import { hasComponentType } from '../component';
import { getVTLCompatibleValue } from '../../../utils/vtl';

/**
 * Fill props for roundabout
 * - expressions, VTL that states the level of completion for each iteration
 */
function fillRoundaboutProps(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Roundabout'>>,
	state: Pick<LunaticState, 'executeExpression'>
) {
	const iterations = component.iterations as number; // iterations is the result of an expression but we know it's a number
	const compiled = Object.entries(component.expressions).reduce(function (
		result,
		[name, expression]
	) {
		const values = new Array(iterations).fill(null).map((_, iteration) => {
			return state.executeExpression(expression, {
				iteration,
			});
		});
		return { ...result, [name]: values };
	}, {});
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
				handleChange: createChangeHandlerForIteration(
					state.handleChange,
					iteration
				),
				pager: {
					...state.pager,
					iteration: iteration,
					subPage: 0, // Fake a subpage to simulate an iteration
				},
			}),
	};
}

// Create change handler memoized for every iteration
let changeHandler = null as null | LunaticState['handleChange'];
const changeHandlerMap = new Map<number, LunaticState['handleChange']>();
function createChangeHandlerForIteration(
	handleChange: LunaticState['handleChange'],
	iteration: number
) {
	if (handleChange !== changeHandler) {
		changeHandler = handleChange;
		changeHandlerMap.clear();
	}
	let handler = changeHandlerMap.get(iteration);
	if (handler) {
		return handler;
	}
	handler = (response, value) => {
		handleChange(response, value, { iteration: [iteration] });
	};
	changeHandlerMap.set(iteration, handler);
	return handler;
}

/**
 * For pairwise, inject a method to retrieve component at a specific iteration combination
 */
function fillPairwise(
	component: DeepTranslateExpression<
		LunaticComponentDefinition<'PairwiseLinks'>
	>,
	state: LunaticState
) {
	return {
		...component,
		getComponents: (x: number, y: number) => {
			if (x === y) {
				return [];
			}
			return fillComponents(component.components, {
				...state,
				handleChange: (response, value) => {
					state.handleChange(response, value, { iteration: [x, y] });
					// Update linked value
					if (
						response.name in component.symLinks &&
						value in component.symLinks[response.name]
					) {
						state.handleChange(
							response,
							component.symLinks[response.name][value],
							{ iteration: [y, x] }
						);
					}
				},
				pager: {
					...state.pager,
					linksIterations: [x, y],
					subPage: 0, // Fake a subpage to simulate an iteration
				},
			});
		},
	};
}

/**
 * For pairwise, inject a method to retrieve component at a specific iteration combination
 */
function fillTable(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Table'>>,
	state: LunaticState
) {
	return {
		...component,
		body: component.body.map((row) =>
			row.map((component) => {
				if (hasComponentType(component)) {
					return fillComponent(component, state);
				}
				// We can have a non typed component with extra attributes (colspan, rowspan)
				return {
					...component,
					label: state.executeExpression(
						getVTLCompatibleValue(component.label)
					),
				};
			})
		),
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
		case 'PairwiseLinks':
			return fillPairwise(component, state);
		case 'Table':
			return fillTable(component, state);
		default:
			return component;
	}
}

export default fillSpecificExpressions;
