import { getSimpleNewPage } from './shared';

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
		const newPage = getSimpleNewPage(
			components,
			bindings,
			currentPage,
			features,
			'NEXT'
		);
		// TODO : redirect when new page display Loop
		// TODO: Boarder
		return `${parseInt(newPage, 10)}`;
	}
};
