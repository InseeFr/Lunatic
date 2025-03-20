import { isNumber } from '../../utils/number';
import { hasResponse, hasResponses } from '../commons/component';
import type { LunaticComponentDefinition, LunaticPager } from '../type';
import type { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';

export function getValueProp(
	component: LunaticComponentDefinition,
	args: {
		pager: LunaticPager;
		variables: LunaticVariablesStore;
	}
): unknown {
	let iteration = isNumber(args.pager.iteration)
		? [args.pager.iteration]
		: undefined;
	if (args.pager.linksIterations) {
		iteration = args.pager.linksIterations;
	}
	if (hasResponses(component)) {
		return Object.fromEntries(
			component.responses?.map(({ response }) => [
				response.name,
				args.variables.get(response.name, iteration),
			]) ?? []
		);
	}
	if (hasResponse(component)) {
		return args.variables.get(component.response.name, iteration);
	}
	// For loop, value will be a map of child component values
	if (component.componentType === 'Loop') {
		return getChildResponseValues(component.components, args.variables);
	}
	return null;
}

/**
 * Get the values of every child components recursively.
 */
function getChildResponseValues(
	components: LunaticComponentDefinition[],
	variables: LunaticVariablesStore
): Record<string, unknown> {
	return Object.fromEntries(
		components.flatMap((c) => {
			if ('response' in c) {
				return [[c.response.name, variables.get(c.response.name)]];
			}
			if ('components' in c) {
				return Object.entries(getChildResponseValues(c.components, variables));
			}
			return [];
		})
	);
}
