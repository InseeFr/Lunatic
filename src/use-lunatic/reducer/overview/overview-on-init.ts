import {
	LunaticState,
	LunaticStatePage,
	OverviewSeq,
	OverviewSubseq,
} from '../../type';

import { ActionInit } from '../../actions';
import { isPageReached } from '../../commons/page-tag';

const isSequence = (sourceComponent: LunaticStatePage) =>
	sourceComponent.components.length > 0 &&
	'hierarchy' in sourceComponent.components[0];

const isSequenceSamePage = (sourceComponent: LunaticStatePage, page: string) =>
	sourceComponent.components[0].hierarchy.sequence.page === page;

const isSubsequenceSamePage = (
	sourceComponent: LunaticStatePage,
	page: string
) =>
	sourceComponent.components[0].hierarchy.subSequence !== undefined &&
	sourceComponent.components[0].hierarchy.subSequence.page === page;

function getOverview(state: LunaticState) {
	const { pages, executeExpression, pager } = state;

	// prevent misordered pages by extracting forbidden pages
	const subPages: string[] = Object.values(pages).reduce(
		(acc: string[], curr: LunaticStatePage) => {
			if (curr.subPages !== undefined) return [...acc, ...curr.subPages];
			return acc;
		},
		[]
	);

	const filteredComponents = Object.entries(pages)
		.filter(
			([k, v]) =>
				!subPages.includes(k) &&
				isSequence(v) &&
				(isSequenceSamePage(v, k) || isSubsequenceSamePage(v, k))
		)
		.map(([, v]) => v.components[0]);

	const overviewEntries: {
		sequences: OverviewSeq[];
		subSequences: OverviewSubseq[];
	} = { sequences: [], subSequences: [] };
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

export function reduceOverviewOnInit(state: LunaticState, action: ActionInit) {
	const overview = action.payload.withOverview ? getOverview(state) : [];
	return { ...state, overview };
}
