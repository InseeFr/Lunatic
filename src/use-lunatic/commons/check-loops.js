import isPaginatedLoop from './is-paginated-loop';
import isRoundabout from './is-roundabout';

function extractSubPages(component, previous = []) {
	const { components } = component;
	return components.reduce(function (pages, component) {
		const { page } = component;

		if (page && pages.indexOf(page) === -1) {
			return [...pages, page];
		}
		return pages;
	}, previous);
}

function extractLoop(components = []) {
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
					subPages: extractSubPages(component, subPages),
					iterations: iterations || component.iterations,
					loopDependencies: loopDependencies || component.loopDependencies,
				};
			}
			return { isLoop, subPages, iterations, roundabout };
		},
		{
			isLoop: false,
			subPages: undefined,
			iterations: undefined,
			loopDependencies: undefined,
		}
	);
}

function checkLoops(pages) {
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
