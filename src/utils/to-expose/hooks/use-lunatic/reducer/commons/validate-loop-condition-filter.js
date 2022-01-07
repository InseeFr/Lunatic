import { executeConditionFilter } from '../../commons';

function validateLoopConditionFilter(state, { next }) {
	const { pages, executeExpression } = state;
	const { components } = pages[next];
	const [loop] = components;
	if (loop) {
		const { conditionFilter } = loop;
		if (conditionFilter) {
			return executeConditionFilter(conditionFilter, executeExpression);
		}
	}
	return true;
}

export default validateLoopConditionFilter;
