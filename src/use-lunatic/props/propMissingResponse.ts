import type { LunaticComponentDefinition, LunaticPager } from '../type';
import { isNumber } from '../../utils/number';
import type { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';

export function getMissingResponseProp(
	component: LunaticComponentDefinition,
	{
		pager,
		variables,
	}: {
		pager: LunaticPager;
		variables: LunaticVariablesStore;
	}
) {
	// Component does not have a missing response
	if (!('missingResponse' in component) || !component.missingResponse) {
		return undefined;
	}

	const missingResponse = component.missingResponse;
	return {
		...missingResponse,
		value: variables.get(
			missingResponse.name,
			isNumber(pager.iteration) ? [pager.iteration] : undefined
		),
	};
}
