import isPaginatedLoop from './is-paginated-loop';
import isRoundabout from './is-roundabout';
import {
	LunaticExpression,
	LunaticComponentDefinition,
	LunaticState,
} from '../type';

/**
 * Extract the list of subpages linked to a component
 */
function extractSubPages(
	component: LunaticComponentDefinition,
	previous: string[] = []
): string[] {
	if (!('components' in component)) {
		return [];
	}
	const { components } = component;
	return components.reduce(function (pages, component) {
		const { page } = component;

		if (page && pages.indexOf(page) === -1) {
			return [...pages, page];
		}
		return pages;
	}, previous);
}

function extractLoop(components: LunaticComponentDefinition[] = []) {
	return components.reduce(
		function (
			{ isLoop, subPages, iterations, loopDependencies, roundabout },
			component
		) {
			const currentIsLoop = isPaginatedLoop(component);
			const currentIsRoundabout = isRoundabout(component);
			if (currentIsLoop) {
				return {
					isLoop: true,
					subPages: extractSubPages(component, subPages),
					iterations: iterations || component.iterations,
					loopDependencies: loopDependencies || component.loopDependencies,
					roundabout: roundabout || currentIsRoundabout,
				};
			}
			return { isLoop, subPages, iterations };
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

function checkLoops(pages: LunaticState['pages']) {
	return Object.entries(pages).reduce(function (map, current) {
		const [number, content] = current;
		if (number !== 'unpaged') {
			const { components } = content;
			const { isLoop, subPages, iterations, loopDependencies } =
				extractLoop(components);

			return {
				...map,
				[number]: {
					...content,
					isLoop,
					subPages,
					iterations,
					loopDependencies,
				},
			};
		}
		return map;
	}, {});
}

export default checkLoops;
