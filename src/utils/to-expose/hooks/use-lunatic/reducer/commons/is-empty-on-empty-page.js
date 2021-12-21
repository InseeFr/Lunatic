import { getComponentsFromState, executeConditionFilter } from '../../commons';

function isOnEmptyPage(state) {
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
			if (result !== false) {
				return [...rest, component];
			}
		}
		return rest;
	}, []);

	if (!rest.length) {
		return true;
	}

	return false;
}

export default isOnEmptyPage;
