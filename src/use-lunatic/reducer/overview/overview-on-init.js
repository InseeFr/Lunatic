import { isPageReached } from '../../commons/page-tag';

const isSequence = (sourceComponent) =>
	sourceComponent.components.length > 0 &&
	'hierarchy' in sourceComponent.components[0];

const isSequenceSamePage = (sourceComponent, page) =>
	sourceComponent.components[0].hierarchy.sequence.page === page;

const isSubsequenceSamePage = (sourceComponent, page) =>
	sourceComponent.components[0].hierarchy.subSequence !== undefined &&
	sourceComponent.components[0].hierarchy.subSequence.page === page;

function getOverview(state) {
	const { pages, executeExpression, pager } = state;

	// prevent misordered pages by extracting forbidden pages
	const subPages = Object.values(pages).reduce((acc, curr) => {
		if (curr.subPages !== undefined) return [...acc, ...curr.subPages];
		return acc;
	}, []);

	const filteredComponents = Object.entries(pages)
		.filter(
			([k, v]) =>
				!subPages.includes(k) &&
				isSequence(v) &&
				(isSequenceSamePage(v, k) || isSubsequenceSamePage(v, k))
		)
		.map(([, v]) => v.components[0]);

	const overviewEntries = { sequences: [], subSequences: [] };
	for (const component of filteredComponents) {
		const { hierarchy, conditionFilter } = component;
		if ('subSequence' in hierarchy) {
			overviewEntries.subSequences.push({
				...hierarchy.subSequence,
				type: 'subSequence',
				parent: hierarchy.sequence.page,
				conditionFilter,
				visible: executeExpression(conditionFilter) ?? false,
				reached: isPageReached(
					hierarchy.subSequence.page,
					pager.lastReachedPage
				),
				evaluatedLabel: executeExpression(hierarchy.subSequence.label),
			});
		} else {
			overviewEntries.sequences.push({
				...hierarchy.sequence,
				type: 'sequence',
				conditionFilter,
				reached: isPageReached(hierarchy.sequence.page, pager.lastReachedPage),
				visible: executeExpression(conditionFilter) ?? false,
				evaluatedLabel: executeExpression(hierarchy.sequence.label),
			});
		}
	}

	const { sequences, subSequences } = overviewEntries;
	return [...sequences, ...subSequences];
}

export function reduceOverviewOnInit(state, action) {
	const overview = action.payload.withOverview ? getOverview(state) : [];
	return { ...state, overview };
}
