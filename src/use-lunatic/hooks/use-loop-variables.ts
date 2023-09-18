import type { LunaticComponentDefinition, LunaticState } from '../type';
import { useMemo } from 'react';

/**
 * Extract the list of variables used for the current loop
 */
export function useLoopVariables(
	pager: LunaticState['pager'],
	pages: LunaticState['pages']
): string[] {
	const { iteration, page } = pager;
	const inIteration = iteration !== undefined;
	return useMemo(() => {
		if (!inIteration) {
			return [];
		}
		// Find the loop to extract the dependencies
		const loop = pages[page]?.components.find(
			(c) => c.componentType === 'Loop'
		) as LunaticComponentDefinition<'Loop'> | undefined;
		return loop?.loopDependencies ?? [];
	}, [page, pages, inIteration]);
}
