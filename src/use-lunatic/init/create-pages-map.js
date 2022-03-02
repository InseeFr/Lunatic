import { getPageTag } from '../commons';

function getSubPages(tag, content) {
	const { pages } = content;
	if (pages) {
		return Object.keys(pages).reduce(function (a, page) {
			return [...a, `${tag}.${page}`];
		}, []);
	}
	return undefined;
}

function parsePages(source, previousLevels = []) {
	const { pages } = source;
	if (typeof pages === 'object') {
		return Object.entries(pages).reduce(function (map, [page, content]) {
			const levels = [...previousLevels, Number.parseInt(page)];
			const tag = getPageTag(levels);

			return {
				...map,
				[tag]: {
					...content,
					levels,
					subPages: getSubPages(tag, content),
					parent: getPageTag(previousLevels),
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
