import type {
	LunaticChangeHandler,
	LunaticComponentDefinition,
	LunaticState,
} from '../type';
import { type DeepTranslateExpression } from '../commons/fill-components/fill-component-expressions';
import { hasComponentType } from '../commons/component';
import { getVTLCompatibleValue } from '../../utils/vtl';
import {
	fillComponent,
	fillComponents,
} from '../commons/fill-components/fill-components';

type State = Parameters<typeof fillComponent>[1];

/**
 * Fill props for roundabout
 * - expressions, VTL that states the level of completion for each iteration
 */
function getRoundaboutProps(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Roundabout'>>,
	state: State
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
	return { expressions: compiled };
}

/**
 * Fill child components for nested component type
 */
function getChildComponents(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Question'>>,
	state: State
) {
	return {
		components: fillComponents(component.components, state),
	};
}

/**
 * For loops, inject a method to retrieve component at a specific iteration
 */
function getChildComponentsWithIteration(
	component: DeepTranslateExpression<
		LunaticComponentDefinition<'Loop' | 'RosterForLoop'>
	> & {
		value?: Record<string, unknown[]>;
	},
	state: State
) {
	return {
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
let changeHandler = null as null | LunaticChangeHandler;
const changeHandlerMap = new Map<number, LunaticChangeHandler>();
function createChangeHandlerForIteration(
	handleChange: LunaticChangeHandler,
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
function getPairwiseProps(
	component: DeepTranslateExpression<
		LunaticComponentDefinition<'PairwiseLinks'>
	>,
	state: State
) {
	return {
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
function getTableProps(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Table'>>,
	state: State
) {
	return {
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
 * For suggester, inject the arbitrary value if necessary
 */
function getSuggesterProps(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Suggester'>>,
	state: State
) {
	if (!component.arbitrary) {
		return component;
	}
	return {
		arbitraryValue: state.executeExpression(component.arbitrary.response.name, {
			iteration: state.pager.iteration,
		}),
	};
}

/**
 * Get component specific props (RoundAbout for instance)
 */
export function getComponentTypeProps(
	component: DeepTranslateExpression<LunaticComponentDefinition>,
	state: State
) {
	switch (component.componentType) {
		case 'Roundabout':
			return getRoundaboutProps(component, state);
		case 'Question':
			return getChildComponents(component, state);
		case 'Loop':
		case 'RosterForLoop':
			return getChildComponentsWithIteration(component, state);
		case 'PairwiseLinks':
			return getPairwiseProps(component, state);
		case 'Table':
			return getTableProps(component, state);
		case 'Suggester':
			return getSuggesterProps(component, state);
		default:
			return {};
	}
}
