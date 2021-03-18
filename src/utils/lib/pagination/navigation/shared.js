import { interpret } from '../../../to-expose/interpret';

export const getSimpleNewPage = (
	components,
	bindings,
	currentPage,
	features,
	type
) =>
	(type === 'PREVIOUS' ? components.slice().reverse() : components)
		.filter(({ page }) => {
			switch (type) {
				case 'NEXT':
					return parseInt(page, 10) > parseInt(currentPage, 10);
				case 'PREVIOUS':
					return parseInt(page, 10) < parseInt(currentPage, 10);
				default:
					throw new Error('Unknown type');
			}
		})
		.reduce((acc, { conditionFilter, page }) => {
			if (acc) return acc;
			if (
				!conditionFilter ||
				interpret(features)(bindings, true)(conditionFilter) === 'normal'
			)
				return page;
			else return null;
		}, null);
