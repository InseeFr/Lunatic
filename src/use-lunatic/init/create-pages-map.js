import { getPageTag } from '../commons';

function getSubPages(content) {
	const { pages } = content;
	if (pages) {
		return Object.keys(pages).reduce(function (a, page) {
			return [...a, Number.parseInt(page)];
		}, []);
	}
	return undefined;
}

function parsePages(source, previousLevels = []) {
	const { pages } = source;
	if (typeof pages === 'object') {
		return Object.entries(pages).reduce(function (map, [page, content]) {
			const { components, iterations } = content;
			const levels = [...previousLevels, Number.parseInt(page)];

			const tag = getPageTag({ pages: levels });
			return {
				...map,
				[tag]: {
					components,
					levels,
					iterations,
				},
				...parsePages(content, levels),
			};
		}, {});
	}
	return {};
}

function createPagesMap(source) {
	return parsePages(source);
}

export default createPagesMap;
