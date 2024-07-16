import type {
	LunaticComponentDefinition,
	LunaticOverviewItem,
} from '../../type';
import type { LunaticSource } from '../../type';
import type { ItemOf } from '../../../type.utils';

/**
 * Resolve overview items from component definition
 */
function overviewFromComponent(
	items: LunaticOverviewItem[],
	component: ItemOf<LunaticSource['components']>,
	extra: Partial<LunaticOverviewItem> = {}
): LunaticOverviewItem[] {
	// For loop we need to explore Subsequence inside the loop
	if (
		component.componentType === 'Loop' ||
		component.componentType === 'Roundabout'
	) {
		return overviewFromLoop(items, component);
	}

	// Only consider Sequence / Subsequence as potential overview item
	if (
		(component.componentType === 'Subsequence' ||
			component.componentType === 'Sequence') &&
		component.label
	) {
		const page = 'page' in component ? component.page : component.goToPage;
		const parts = page.split('.');
		items.push({
			id: component.id,
			type: component.componentType,
			pageTag: page,
			page: parseInt(parts[0], 10),
			label: component.label,
			description: component.description,
			conditionFilter: component.conditionFilter,
			...extra,
		});
	}

	return items;
}

/**
 * Resolve subcomponents of a loop
 */
function overviewFromLoop(
	items: LunaticOverviewItem[],
	component: LunaticComponentDefinition<'Loop' | 'Roundabout'>
): LunaticOverviewItem[] {
	// Since we don't know how many iterations we have, skip this component
	if (!('iterations' in component)) {
		return items;
	}
	for (const child of component.components as LunaticSource['components']) {
		items = overviewFromComponent(items, child, {
			iterations: component.iterations,
		});
	}
	return items;
}

/**
 * Build a static overview from the state, this overview will be interpreted on page change
 */
export function buildOverview(source: LunaticSource): LunaticOverviewItem[] {
	return source.components.reduce(
		(acc, c) => overviewFromComponent(acc, c),
		[] as LunaticOverviewItem[]
	);
}
