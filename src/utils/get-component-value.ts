import { LunaticComponentDefinition } from '../use-lunatic/type';
import { LabelType } from '../use-lunatic/type-source';
import { hasResponse, hasResponses } from './check-responses';
import { objectMap } from './object';

export type ComponentWithResponses = LunaticComponentDefinition & {
	response: { name: string };
} & {
	responses: Array<{
		label: LabelType;
		response: ResponseType;
		id: string;
	}>;
};

/**
 * Extract the value associated with a component
 */
export function getComponentValue(
	component: ComponentWithResponses,
	valueMap: Record<string, unknown>,
	rowIndex?: number
) {
	let value = undefined;

	if (hasResponse(component)) {
		const { name } = component.response;
		const valueArray = valueMap[name];
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
