import type { LunaticComponentDefinition, LunaticReducerState } from '../type';
import { useMemo } from 'react';

/**
 * Extract the list of variables used for the current loop or roundabout.
 */
export function useLoopVariables(
	pager: LunaticReducerState['pager'],
	pages: LunaticReducerState['pages'],
	loopType: 'Loop' | 'Roundabout' = 'Loop'
): string[] {
	const { iteration, page } = pager;
	const inIteration = iteration !== undefined;
	return useMemo(() => {
		if (!inIteration) {
			return [];
		}
		// Find the loop to extract the dependencies
		const loop = pages[page]?.components.find(
			(c) => c.componentType === loopType
		) as
			| LunaticComponentDefinition<'Loop'>
			| LunaticComponentDefinition<'Roundabout'>
			| undefined;

		return loop?.loopDependencies ?? [];
	}, [inIteration, pages, page, loopType]);
}
