import type { ReactNode } from 'react';
import type { LunaticComponentDefinition } from '../type';
import type { ComponentDefinition } from '../../type.source';

export function hasResponse(
	component: unknown
): component is { response: { name: string } } {
	return (
		!!component &&
		typeof component === 'object' &&
		'response' in component &&
		'name' in (component.response as object)
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

/**
 * Find a component recursively using a specific condition
 */
export function findComponent(
	components: ComponentDefinition[],
	cb: (component: ComponentDefinition) => boolean
): ComponentDefinition | null {
	for (const component of components) {
		if (cb(component)) {
			return component;
		}
		if ('components' in component) {
			const child = findComponent(component.components, cb);
			if (child) {
				return child;
			}
		}
	}
	return null;
}
