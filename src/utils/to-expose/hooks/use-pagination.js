import { useState, useEffect, useCallback } from 'react';

function createPages(components) {
	return components.reduce(
		function (current, component) {
			const { page } = component;
			if (!page) {
				return { ...current, unpaged: [...current.unpaged, component] };
			}
			if (page in current) {
				return { ...current, [page]: [...current[page], component] };
			}
			return { ...current, [page]: [component] };
		},
		{ unpaged: [] }
	);
}

/**
 *
 * @param {*} questionnaire
 * @returns
 */
function usePagination(questionnaire, { initialPage = '1' } = {}) {
	const { maxPage, components } = questionnaire;
	const [page] = useState(initialPage);
	const [pages, setPages] = useState(pages);

	useEffect(
		function () {
			if (Array.isArray(components) && components.length && maxPage) {
				setPages(createPages(components));
			}
		},
		[maxPage, components]
	);

	const getComponents = useCallback(
		function () {
			if (pages && pages && page in pages) {
				return pages[page];
			}
			return [];
		},
		[page, pages]
	);

	// const isFirstPage = page === '1';
	// const isLastPage = page === maxPage;

	return { getComponents, page };
}

export default usePagination;
