import type { LunaticOverviewItem, LunaticState, PageTag } from '../type';
import { type DependencyList, type ReactNode, useMemo } from 'react';

export type InterpretedLunaticOverviewItem = {
	id: string;
	type: string;
	page: PageTag;
	label: ReactNode;
	description: ReactNode;
	reached: boolean;
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
	}: Pick<LunaticState, 'executeExpression' | 'overview' | 'pager'>,
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
	items = items.sort(pageTagComparator);
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
			pageTagComparator({ page: pager?.lastReachedPage ?? '-1' }, { page }) >= 0
				? true
				: false,
		page: page,
	});

	return items;
};

/**
 * Organize page in the right order (positive if a > b)
 *
 * Page are organized by iteration, then subpage, then page
 */
const pageTagComparator = (
	a: Pick<InterpretedLunaticOverviewItem, 'page'>,
	b: Pick<InterpretedLunaticOverviewItem, 'page'>
) => {
	const pageA = a.page.split(/\D/).map((v) => parseInt(v, 10));
	const pageB = b.page.split(/\D/).map((v) => parseInt(v, 10));
	// [0, 2, 1] is used to extract the significant part of the pageTag part (start with page, then iteration, then subpage)
	for (const index of [0, 2, 1]) {
		if (pageA[index] !== pageB[index]) {
			return (pageA[index] ?? -1) - (pageB[index] ?? -1);
		}
	}
	return 0;
};
