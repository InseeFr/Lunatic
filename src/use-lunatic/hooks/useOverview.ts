import type {
	LunaticOverviewItem,
	LunaticReducerState,
	LunaticState,
	PageTag,
} from '../type';
import { type DependencyList, type ReactNode, useMemo } from 'react';
import { getPageTag, pageTagComparator } from '../commons/page-tag';

export type InterpretedLunaticOverviewItem = {
	id: string;
	type: string;
	page: PageTag;
	label: ReactNode;
	description: ReactNode;
	reached: boolean;
	current: boolean;
	children: InterpretedLunaticOverviewItem[];
};

/**
 * Hook to build a filled overview everytime the deps change
 */
export const useOverview = (
	{
		overview,
		executeExpression,
		pager,
	}: Pick<LunaticReducerState, 'executeExpression' | 'overview' | 'pager'>,
	deps: DependencyList
) => {
	return useMemo(
		() => interpretOverview(overview, executeExpression, pager),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[...deps, overview]
	);
};

/**
 * Use lunatic data to interpret the static overview (calculated on init) with the real data
 */
const interpretOverview = (
	overviewItems: LunaticOverviewItem[],
	executeExpression: LunaticState['executeExpression'],
	pager?: LunaticState['pager']
) => {
	// Flat structure of the overview
	let items = overviewItems.reduce(
		(acc, item) => interpretOverviewItem(acc, item, executeExpression, pager),
		[] as InterpretedLunaticOverviewItem[]
	);
	// Sort using the page logic
	items = items.sort((a, b) => pageTagComparator(a.page, b.page));
	// Build a tree with nested item, a subsequence will be a child of the previous sequence
	const rootItems = [] as typeof items;
	let parent = null as null | InterpretedLunaticOverviewItem;

	for (const item of items) {
		if (item.type === 'Sequence') {
			rootItems.push(item);
			parent = item;
		} else {
			parent?.children.push(item);
		}
	}

	if (pager) {
		applyCurrentPage(rootItems, getPageTag(pager));
	}

	return rootItems;
};

/**
 * Interpret expression inside an item (label & condition)
 */
const interpretOverviewItem = (
	items: InterpretedLunaticOverviewItem[],
	item: LunaticOverviewItem,
	executeExpression: LunaticState['executeExpression'],
	pager?: LunaticState['pager'],
	iteration?: number
): InterpretedLunaticOverviewItem[] => {
	// We reached a loop item, we need to add it multiple time
	if (item.iterations && iteration === undefined) {
		const iterations = executeExpression<number>(item.iterations) ?? 0;
		for (let i = 0; i < iterations; i++) {
			items = interpretOverviewItem(items, item, executeExpression, pager, i);
		}
		return items;
	}

	const isVisible = !!executeExpression(item.conditionFilter, {
		iteration: iteration,
	});

	if (!isVisible) {
		return items;
	}

	// Append the item to the list of items
	const page =
		`${item.pageTag}${iteration !== undefined ? `#${iteration + 1}` : ''}` as PageTag;
	items.push({
		id: item.id,
		type: item.type,
		label: executeExpression(item.label, { iteration }),
		description: item.description
			? executeExpression(item.description, { iteration })
			: undefined,
		children: [],
		reached:
			pageTagComparator(pager?.lastReachedPage ?? '-1', page) >= 0
				? true
				: false,
		page: page,
		current: false,
	});

	return items;
};

/**
 * Set the current property in the correct overview item
 */
const applyCurrentPage = (
	items: InterpretedLunaticOverviewItem[],
	currentPage: PageTag
): InterpretedLunaticOverviewItem[] => {
	// Look for the last item where page <= currentPage
	const currentItem = items.findLast(
		(item) => pageTagComparator(item.page, currentPage) <= 0
	);

	if (!currentItem) {
		return items;
	}

	// Make this page "current"
	currentItem.current = true;
	if (currentItem.children.length > 0) {
		applyCurrentPage(currentItem.children, currentPage);
	}

	return items;
};
