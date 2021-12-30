import isPaginatedLoop from './is-paginated-loop';

function isUnpaginated(questionnaire) {
	const { maxPage } = questionnaire;
	return maxPage === undefined;
}

/**
 *
 * @param {*} component: object
 * @param {*} page: string
 * @param {*} map Map<page,{ components: Array<component>, isLoop: boolean, subPages: Array<page> }>
 * @returns
 */
function mergeComponent(component, page, map) {
	if (!page) {
		return { ...map, unpaged: [...map.unpaged, component] };
	}
	if (page in map) {
		const current = map[page];
		const { components } = current;
		return {
			...map,
			[page]: { ...current, components: [...components, component] },
		};
	}
	return { ...map, [page]: { components: [component] } };
}

function mergeNestedComponents(components, map) {
	return components.reduce(function (current, component) {
		const { page } = component;
		if (page) {
			return mergeComponent(component, page, current);
		}

		return current;
	}, map);
}
/**
 *
 * @param {*} components
 * @returns
 */
function createPages(questionnaire) {
	const { components } = questionnaire;
	if (isUnpaginated(questionnaire)) {
		return { 1: { components } }; // no page -> one page ;)
	}
	const map = components.reduce(
		function (current, component) {
			const { components, page } = component;
			if (isPaginatedLoop(component)) {
				return mergeComponent(
					component,
					page,
					mergeNestedComponents(components, current)
				);
			}

			return mergeComponent(component, page, current);
		},
		{ unpaged: [] }
	);

	return map;
}

export default createPages;
