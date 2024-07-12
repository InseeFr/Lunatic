import { isPaginatedLoop } from './is-paginated-loop';
import { isRoundabout } from './is-roundabout';
import type { LunaticReducerState, LunaticSource } from '../type';
import type { ItemOf } from '../../type.utils';
import { addLoopInfos } from './add-loop-info';

function isUnpaginated(questionnaire: { maxPage?: unknown }): boolean {
	const { maxPage } = questionnaire;
	return maxPage === undefined;
}

/**
 * Append component to the right page in the accumulator
 */
function addComponentToPage(
	component: ItemOf<LunaticSource['components']>,
	page: string,
	map: LunaticReducerState['pages']
): LunaticReducerState['pages'] {
	if (!page) {
		page = 'unpaged';
	}
	if (page in map) {
		const current = map[page];
		const { components } = current;
		return {
			...map,
			[page]: { ...current, components: [...components, component] },
		};
	}
	return {
		...map,
		[page]: { components: [component] },
	} as LunaticReducerState['pages'];
}

/**
 * Merge child components in the map
 */
function addNestedComponent(
	components: LunaticSource['components'],
	map: LunaticReducerState['pages']
): LunaticReducerState['pages'] {
	return components.reduce(function (current, component) {
		if ('page' in component && component.page) {
			return addComponentToPage(component, component.page, current);
		}

		return current;
	}, map);
}

/**
 * Clean source JSON oddities
 */
function cleanComponent(component: any): ItemOf<LunaticSource['components']> {
	if ('components' in component) {
		component.components = component.components.map(cleanComponent);
	}

	// For loop if min iterations = max iterations use iterations instead
	if (
		'lines' in component &&
		'min' in component.lines &&
		'max' in component.lines &&
		component.lines.max.value === component.lines.min.value
	) {
		component.iterations = component.lines.min;
		delete component.lines;
	}

	return component;
}

/**
 * Extract pages from questionnaire
 */
export function pagesFromSource(
	questionnaire: LunaticSource
): LunaticReducerState['pages'] {
	const { components } = questionnaire;
	// If we have no page, create one with all the components
	if (isUnpaginated(questionnaire)) {
		return { '1': { components: components, isLoop: false } };
	}
	const pages = components.map(cleanComponent).reduce(
		(current, component) => {
			if (isPaginatedLoop(component) || isRoundabout(component)) {
				return addComponentToPage(
					component,
					component.page,
					addNestedComponent(component.components, current)
				);
			}

			if ('page' in component && component.page) {
				return addComponentToPage(component, component.page, current);
			}

			return current;
		},
		{} as LunaticReducerState['pages']
	);

	return addLoopInfos(pages);
}
