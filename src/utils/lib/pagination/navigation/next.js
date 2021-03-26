import { getSimpleNewPage } from './shared';

// Recusive function on currentPage
export const getNextPage = (components, bindings, currentPage, features) => {
	// 2.2#2
	// 2.2#1.2#2

	if (currentPage.includes('#')) {
		const currentPageWithoutIteration = currentPage
			.split('#')
			.slice(0, -1)
			.join('#');

		const rootPage = currentPageWithoutIteration
			.split('.')
			.slice(0, -1)
			.join('.');

		const currentComponentIndex = parseInt(
			currentPageWithoutIteration.split('.').slice().pop()
		);

		const currentIteration = parseInt(currentPage.split('#').pop(), 10);

		return `${rootPage}.${currentComponentIndex + 1}#${currentIteration}`;
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
