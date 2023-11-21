import type {
	LunaticComponentDefinition,
	LunaticOverviewItem,
	LunaticState,
} from '../../type';
import { type ActionInit } from '../../actions';

type Page = LunaticState['pages'][keyof LunaticState['pages']];

const isSequence = (sourceComponent: Page) =>
	sourceComponent.components.length > 0 &&
	'hierarchy' in sourceComponent.components[0];

const isSequenceSamePage = (sourceComponent: Page, page: string) =>
	sourceComponent.components[0].hierarchy?.sequence.page === page;

const isSubsequenceSamePage = (sourceComponent: Page, page: string) =>
	sourceComponent.components[0].hierarchy?.subSequence !== undefined &&
	sourceComponent.components[0].hierarchy?.subSequence.page === page;

const isPageReached = (page: string, lastReachedPage: string) =>
	parseInt(page, 10) <= parseInt(lastReachedPage, 10);

function getOverview(state: LunaticState) {
	const { pages, executeExpression, pager } = state;

	// prevent misordered pages by extracting forbidden pages
	const subPages = Object.values(pages).reduce((acc, curr) => {
		if (curr.subPages !== undefined) return [...acc, ...curr.subPages];
		return acc;
	}, [] as string[]);

	const filteredComponents = Object.entries(pages)
		.filter(
			([k, v]) =>
				subPages &&
				!subPages.includes(k) &&
				isSequence(v) &&
				(isSequenceSamePage(v, k) || isSubsequenceSamePage(v, k))
		)
		.map(([, v]) => v.components[0] as LunaticComponentDefinition<'Sequence'>);

	const overviewEntries = {
		sequences: [] as LunaticOverviewItem[],
		subSequences: [] as LunaticOverviewItem[],
	};
	for (const component of filteredComponents) {
		const { hierarchy, conditionFilter } = component;
		if (hierarchy && hierarchy.subSequence) {
			overviewEntries.subSequences.push({
				...hierarchy.subSequence,
				type: 'subSequence',
				parent: hierarchy.sequence.page,
				conditionFilter,
				visible: executeExpression(conditionFilter) ?? false,
				reached: isPageReached(
					hierarchy.subSequence.page,
					pager.lastReachedPage ?? '1'
				),
				evaluatedLabel: executeExpression(hierarchy.subSequence.label),
				children: [],
			});
		} else if (hierarchy) {
			overviewEntries.sequences.push({
				...hierarchy.sequence,
				type: 'sequence',
				conditionFilter,
				reached: isPageReached(
					hierarchy.sequence.page,
					pager.lastReachedPage ?? '1'
				),
				visible: executeExpression(conditionFilter) ?? false,
				evaluatedLabel: executeExpression(hierarchy.sequence.label),
				children: [],
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
