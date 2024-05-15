import { executeConditionFilter } from '../../commons';
import type { LunaticReducerState } from '../../type';

function validateLoopConditionFilter(
	state: Pick<LunaticReducerState, 'pages' | 'executeExpression'>,
	{ next, iteration }: { next: string; iteration?: number }
): boolean {
	const { pages, executeExpression } = state;
	const { components } = pages[next];
	const [loop] = components;
	if (loop && 'conditionFilter' in loop && loop.conditionFilter) {
		return !!executeConditionFilter(
			loop.conditionFilter,
			executeExpression,
			iteration
		);
	}
	return true;
}

export { validateLoopConditionFilter };
