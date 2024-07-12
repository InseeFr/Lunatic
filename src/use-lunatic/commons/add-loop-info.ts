import { isPaginatedLoop } from './is-paginated-loop';
import { isRoundabout } from './is-roundabout';
import type {
	LunaticComponentDefinition,
	LunaticExpression,
	LunaticReducerState,
} from '../type';

/**
 * Extract the list of subpages linked to a component
 */
function getSubPages(
	component: LunaticComponentDefinition,
	previous: string[] = []
): string[] {
	if (!('components' in component)) {
		return [];
	}
	const { components } = component;
	// We have to force the type here since TS doesn't handle union (A[] | B[]).reduce()
	return (components as LunaticComponentDefinition[]).reduce(
		(pages, component) => {
			const { page } = component;

			if (page && pages.indexOf(page) === -1) {
				return [...pages, page];
			}
			return pages;
		},
		previous
	);
}

function getLoopInfos(components: LunaticComponentDefinition[] = []) {
	return components.reduce(
		function (
			{ isLoop, subPages, iterations, loopDependencies, roundabout },
			component
		) {
			const currentIsLoop = isPaginatedLoop(component);
			const currentIsRoundabout = isRoundabout(component);
			if (currentIsLoop || currentIsRoundabout) {
				return {
					isLoop: isLoop || currentIsLoop,
					roundabout: roundabout || currentIsRoundabout,
					subPages: getSubPages(component, subPages),
					iterations: iterations || component.iterations,
					loopDependencies: loopDependencies || undefined,
				};
			}
			return { isLoop, subPages, iterations, roundabout };
		},
		{
			isLoop: false,
			subPages: undefined,
			iterations: undefined,
			loopDependencies: undefined,
			roundabout: undefined,
		} as {
			isLoop: boolean;
			iterations?: LunaticExpression;
			loopDependencies?: string[];
			subPages?: string[];
			roundabout?: boolean;
		}
	);
}

export function addLoopInfos(pages: LunaticReducerState['pages']) {
	return Object.entries(pages).reduce(
		(map, current) => {
			const [number, content] = current;
			if (number === 'unpaged') {
				return map;
			}
			const { components } = content;
			const { isLoop, subPages, iterations, loopDependencies } =
				getLoopInfos(components);

			return {
				...map,
				[number]: {
					...content,
					isLoop,
					subPages,
					iterations,
					loopDependencies,
				},
			} as LunaticReducerState['pages'];
		},
		{} as LunaticReducerState['pages']
	);
}
