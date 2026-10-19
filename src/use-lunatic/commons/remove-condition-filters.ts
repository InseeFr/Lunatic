import type { ComponentDefinition } from '../../type.source';
import type { ActiveFilter, LunaticExpression, LunaticSource } from '../type';

/**
 * Decide if a conditionFilter must be kept, depending on the active filters mode.
 * - "ALL": Keep every filter
 * - "EXTERNAL": Keep filters based only on external variables
 * - "NONE": Ignore every filter
 */
export function shouldKeepFilter(
	filter: LunaticExpression | undefined,
	activeFilters: ActiveFilter
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
 * Compare the existing element against the outcome of the filtering function
 * and remove it from the source if needed
 */
const removeFilterIfChanged = <T>(
	elements: T[],
	cleanFilterFunction: (element: T) => T
): T[] => {
	const cleaned = elements.map((element) => cleanFilterFunction(element));
	return cleaned.some((element, index) => element !== elements[index])
		? cleaned
		: elements;
};

/**
 * Remove filters from source based from activeFilters props
 */
export function removeConditionFilters(
	source: LunaticSource,
	activeFilters: ActiveFilter
): LunaticSource {
	if (activeFilters === 'ALL') {
		return source;
	}

	// 	Element that can have a condition filter
	//  Component is too dynamic to be typed
	const cleanSingleElement = <T extends object>(element: T): T => {
		if (
			'conditionFilter' in element &&
			!shouldKeepFilter(
				element.conditionFilter as LunaticExpression | undefined,
				activeFilters
			)
		) {
			const rest = { ...element };
			delete rest.conditionFilter;
			return rest as T;
		}

		return element;
	};

	const cleanComponents = <T extends ComponentDefinition>(component: T): T => {
		let current = cleanSingleElement(component);
		if ('components' in current && Array.isArray(current.components)) {
			const components = removeFilterIfChanged(
				current.components,
				cleanComponents
			);
			if (components !== current.components) {
				current = { ...current, components } as T;
			}
		}
		if ('responses' in current && Array.isArray(current.responses)) {
			const currentResponses = current.responses;
			const responses = removeFilterIfChanged(
				currentResponses,
				cleanSingleElement
			);
			if (responses !== currentResponses) {
				current = { ...current, responses } as T;
			}
		}
		if ('options' in current && Array.isArray(current.options)) {
			const currentOptions = current.options
			const options = removeFilterIfChanged(currentOptions, cleanSingleElement);
			if (options !== currentOptions) {
				current = { ...current, options } as T;
			}
		}
		return current;
	};
	return {
		...source,
		components: source.components.map(cleanComponents),
	};
}
