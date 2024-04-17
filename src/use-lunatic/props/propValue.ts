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
	if ('components' in component) {
		return Object.fromEntries(
			component.components
				.map((c) => ('response' in c ? c.response.name : null))
				.filter((name) => name !== null)
				.map((name) => [name, args.variables.get(name!)])
		);
	}
	return null;
}
