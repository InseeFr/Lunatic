import { executeConditionFilter } from '../../commons';
import { LunaticState } from '../../type';

function validateLoopConditionFilter(
	state: LunaticState,
	{ next, iteration }: { next: string; iteration?: number }
): boolean {
	const { pages, executeExpression } = state;
	const { components } = pages[next];
	const [loop] = components;
	if (loop) {
		const { conditionFilter } = loop;
		if (conditionFilter) {
			return !!executeConditionFilter(
				conditionFilter,
				executeExpression,
				iteration
			);
		}
	}
	return true;
}

export { validateLoopConditionFilter };
