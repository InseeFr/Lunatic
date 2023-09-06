import { objectMap } from './object';
import type { ReactNode } from 'react';

/**
 * Extract the value associated with a component
 * If the component expect multiple values (it has a responses property) then extract a map of values
 */
export function getComponentValue<T = unknown>(
	component: unknown,
	valueMap: Record<string, unknown>,
	rowIndex?: number
): T {
	let value = undefined;

	if (hasResponse(component)) {
		const valueArray = valueMap[component.response.name];
		if (Array.isArray(valueArray)) {
			value = valueArray[rowIndex ?? 0] || '';
		}
	}

	// For checkbox group we need to send the map of values
	if (hasResponses(component)) {
		value = objectMap(valueMap, (k, v) => {
			if (Array.isArray(v)) {
				return [k, v[rowIndex ?? 0]];
			}
			return [k, v];
		});
	}
	return value;
}

function hasResponse(
	component: unknown
): component is { response: { name: string } } {
	return (
		!!component &&
		typeof component === 'object' &&
		'response' in component &&
		'name' in (component.response as {})
	);
}

function hasResponses(component: unknown): component is {
	responses?: Array<{
		label: ReactNode;
		description?: ReactNode;
		response: { name: string };
	}>;
} {
	return (
		!!component && typeof component === 'object' && 'responses' in component
	);
}
