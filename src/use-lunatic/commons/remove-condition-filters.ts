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
		elements: any[],
		cleanFilterFunction: (element: any) => any
	): any[] => {
		const cleaned = elements.map((element) => cleanFilterFunction(element));
		return cleaned.some(
			(element, index) => element !== elements[index]
		)
			? cleaned
			: elements;
	};

	// Element that can have a conditon filter 
	const cleanSingleElement = (element: any): any => {
		if (shouldKeepFilter(element?.conditionFilter, activeFilters)) {
			return element;
		}
		const rest = { ...element };
		delete rest.conditionFilter;
		return rest;
	};
	const cleanComponents = (component: any): any => {
		let current = cleanSingleElement(component);
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