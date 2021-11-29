import isPaginatedLoop from './is-paginated-loop';

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

function extractLoop(components) {
	return components.reduce(
		function ({ isLoop, subPages, iterations }, component) {
			const currentIsLoop = isPaginatedLoop(component);
			if (currentIsLoop) {
				return {
					isLoop: true,
					subPages: extractSubPages(component, subPages),
					iterations: iterations || component?.iterations,
				};
			}
			return { isLoop, subPages, iterations };
		},
		{ isLoop: false, subPages: undefined, iterations: undefined }
	);
}

function checkLoops(pages) {
	return Object.entries(pages).reduce(function (map, current) {
		const [number, content] = current;
		if (number !== 'unpaged') {
			const { components } = content;
			const { isLoop, subPages, iterations } = extractLoop(components);

			return { ...map, [number]: { ...content, isLoop, subPages, iterations } };
		}
		return map;
	}, {});
}

export default checkLoops;
