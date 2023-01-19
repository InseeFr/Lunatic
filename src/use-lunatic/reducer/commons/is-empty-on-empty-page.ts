import { getComponentsFromState, executeConditionFilter } from '../../commons';
import { LunaticComponentDefinition, LunaticState } from '../../type';

function isOnEmptyPage(state: LunaticState): boolean {
	const { executeExpression, pager } = state;
	const { iteration } = pager;
	const components = getComponentsFromState(state);
	const rest = components.reduce(function (rest, component) {
		const { conditionFilter } = component;
		if (conditionFilter) {
			const result = executeConditionFilter(
				conditionFilter,
				executeExpression,
				iteration
			);
			if (result === true) {
				return [...rest, component];
			}
		}
		return rest;
	}, [] as LunaticComponentDefinition[]);

	return !rest.length;
}

export default isOnEmptyPage;
