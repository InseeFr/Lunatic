import type { ReactNode } from 'react';
import type { LunaticComponentDefinition } from '../type';

export function hasResponse(
	component: unknown
): component is { response: { name: string } } {
	return (
		!!component &&
		typeof component === 'object' &&
		'response' in component &&
		'name' in (component.response as {})
	);
}

export function hasResponses(component: unknown): component is {
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

export function hasBody(component: unknown): component is {
	body: LunaticComponentDefinition<'Table'>['body'];
} {
	return (
		!!component &&
		typeof component === 'object' &&
		'body' in component &&
		Array.isArray(component.body)
	);
}

export function hasComponentType(
	component: unknown
): component is { componentType: string } {
	return (
		!!component &&
		typeof component === 'object' &&
		'componentType' in component &&
		typeof component.componentType === 'string'
	);
}
