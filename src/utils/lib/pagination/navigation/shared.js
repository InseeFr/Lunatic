import { interpret } from '../../../to-expose/interpret';
import { FLOW_NEXT, FLOW_PREVIOUS } from '../flow';

export const getPage = ({
	components,
	bindings,
	currentPage,
	features,
	depth,
	flow,
	management,
}) => {
	if (currentPage.includes('#')) {
		const {
			currentRootPage,
			currentComponentIndex,
			currentIteration,
		} = splitPage(currentPage, depth);

		if (flow === FLOW_NEXT)
			return `${currentRootPage}.${
				currentComponentIndex + 1
			}#${currentIteration}`;
		if (flow === FLOW_PREVIOUS)
			return `${currentRootPage}.${
				currentComponentIndex - 1
			}#${currentIteration}`;
		throw new Error(`Unknown flow type: ${flow}`);
	} else {
		const newPage = getSimpleNewPage({
			components,
			bindings,
			currentPage,
			features,
			flow,
			management,
		});
		return `${parseInt(newPage, 10)}`;
	}
};

const getSimpleNewPage = ({
	components,
	bindings,
	currentPage,
	features,
	flow,
	management,
}) =>
	(flow === FLOW_PREVIOUS ? components.slice().reverse() : components)
		.filter(({ page }) => {
			switch (flow) {
				case FLOW_NEXT:
					return parseInt(page, 10) > parseInt(currentPage, 10);
				case FLOW_PREVIOUS:
					return parseInt(page, 10) < parseInt(currentPage, 10);
				default:
					throw new Error('Unknown type');
			}
		})
		.reduce((acc, { conditionFilter, page }) => {
			if (acc) return acc;
			if (management) return page;
			if (
				!conditionFilter ||
				interpret(features)(bindings, true)(conditionFilter) === 'normal'
			)
				return page;
			else return null;
		}, null);

export const splitPage = (currentPage, depth) => {
	const currentPageWithDepth = depth
		? currentPage
				.split('.')
				.slice(0, depth + 1) // scoped
				.join('.')
		: currentPage;

	const currentPageWithoutIteration = currentPageWithDepth
		.split('#')
		.slice(0, -1)
		.join('#');

	const currentPageWithoutAnyIteration = currentPageWithDepth
		.split('.')
		.map((e) => e.split('#')[0])
		.join('.');

	const currentRootPage = currentPageWithoutIteration
		.split('.')
		.slice(0, -1)
		.join('.');

	const [currentComponentIndex, currentIteration] = currentPageWithDepth
		.split('.')
		.pop()
		.split('#')
		.map((c) => parseInt(c, 10));

	return {
		currentRootPage,
		currentComponentIndex,
		currentIteration,
		currentPageWithoutAnyIteration,
	};
};
