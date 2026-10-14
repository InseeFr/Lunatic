import { ComponentDefinitionWithPage } from '../../type.source';
import type {
	ActiveFilterType,
	LunaticExpression,
	LunaticSource,
} from '../type';

/**
 * Decide if a conditionFilter must be kept, depending on the active filters mode.
 * - "ALL": Keep every filters
 * - "EXTERNAL": Keep filter only if it is based on external variables only
 * - "NONE": Ignore every filters
 */
export function shouldKeepFilter(
	filter: LunaticExpression | undefined,
	activeFilters: ActiveFilterType
): boolean {
	if (!filter) return true;
	if (activeFilters === 'ALL') return true;
	if (activeFilters === 'NONE') return false;
	// For external active filter we have to check dependencies and remove any filter based on collected or calculated variables
	const dependencies = filter.variablesDependencies;
	return Boolean(
		dependencies &&
		(dependencies.COLLECTED?.length ?? 0) === 0 &&
		(dependencies.CALCULATED?.length ?? 0) === 0
	);
}

/**
 * Remove filters from source based from activeFilters props
 */
export function removeConditionFilters(
	source: LunaticSource,
	activeFilters: ActiveFilterType
): LunaticSource {
	if (activeFilters === 'ALL') {
		return source;
	}
	const removeFilterIfChanged = (
		elements: ComponentDefinitionWithPage[],
		cleanFilterFunction: (element: ComponentDefinitionWithPage) => ComponentDefinitionWithPage
	): any[] => {
		const cleaned = elements.map((element) => cleanFilterFunction(element));
		return cleaned.some(
			(element, index) => element !== elements[index]
		)
			? cleaned
			: elements;
	};

	// Element that can have a conditon filter 
	const cleanSingleElement = (element: ComponentDefinitionWithPage): any => {

		if ('conditionFilter' in element && !shouldKeepFilter(element?.conditionFilter, activeFilters)) {
			const rest = { ...element };
			delete rest.conditionFilter;
			return rest;
		}

		return element;
	};
	const cleanComponents = (component: ComponentDefinitionWithPage): ComponentDefinitionWithPage => {
		let current = cleanSingleElement(component);
		console.log('component', component)
		if (Array.isArray(current.components)) {
			const components = removeFilterIfChanged(current.components, cleanComponents);
			if (components !== current.components) {
				current = { ...current, components };
			}
		}
		if (Array.isArray(current.responses)) {
			const responses = removeFilterIfChanged(current.responses, cleanSingleElement);
			if (responses !== current.responses) {
				current = { ...current, responses };
			}
		}
		if (Array.isArray(current.options)) {
			const options = removeFilterIfChanged(current.options, cleanSingleElement);
			if (options !== current.options) {
				current = { ...current, options };
			}
		}
		return current;
	};
	return {
		...source,
		components: source.components.map(cleanComponents),
	};
}