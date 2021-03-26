import { getSimpleNewPage } from './shared';

// Recusive function on currentPage
export const getPreviousPage = (
	components,
	bindings,
	currentPage,
	features
) => {
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

		return `${rootPage}.${currentComponentIndex - 1}#${currentIteration}`;
	} else {
		const newPage = getSimpleNewPage(
			components,
			bindings,
			currentPage,
			features,
			'PREVIOUS'
		);
		return `${parseInt(newPage, 10)}`;
	}
};
