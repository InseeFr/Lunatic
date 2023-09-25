import type { ReactNode } from 'react';
import { hasResponse, hasResponses } from '../use-lunatic/commons/component';

/**
 * Extract the value associated with a component
 * If the component expect multiple values (it has a responses property) then extract a map of values
 */
export function getComponentValue(
	component: unknown,
	valueMap: Record<string, unknown>,
	rowIndex?: number
): unknown {
	if (hasResponse(component)) {
		const value = valueMap[component.response.name];
		if (Array.isArray(value)) {
			return value[rowIndex ?? 0];
		}
		return value;
	}

	// For checkbox group we need to send the map of values
	if (hasResponses(component)) {
		return Object.fromEntries(
			component.responses?.map(({ response }) => {
				const value = valueMap[response.name];
				if (Array.isArray(value)) {
					return [response.name, value[rowIndex ?? 0]];
				}
				return [response.name, value];
			}) ?? []
		);
	}
	return undefined;
}
