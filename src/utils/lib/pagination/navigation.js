import { interpret } from '../../to-expose/interpret';

// Recusive function on currentPage
export const getNextPage = (components, bindings, currentPage, features) => {
	const newPages = currentPage.split('.');
	const [first, ...rest] = newPages;

	let result = first;
	if (newPages.length > 1) {
		return `${result}.${
			(getNextPage(components, bindings, rest.join('.')), features)
		}`;
	}
	if (first.includes('#')) {
		// Loop
	} else {
		const newPage = components
			.filter(({ page }) => parseInt(page, 10) > parseInt(first, 10))
			.reduce((acc, { conditionFilter, page }) => {
				if (acc) return acc;
				if (
					!conditionFilter ||
					interpret(features)(bindings, true)(conditionFilter) === 'normal'
				)
					return page;
				else return null;
			}, null);
		// TODO : redirect when new page display Loop
		// TODO: Boarder
		return `${parseInt(newPage, 10)}`;
	}
};
