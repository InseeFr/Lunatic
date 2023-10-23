import type { LunaticComponentDefinition } from '../../type';

/**
 * Add required attribute on component that are mandatory
 */
export function fillComponentRequired(component: LunaticComponentDefinition) {
	if (component.mandatory) {
		return {
			...component,
			required: true,
		};
	}
	return component;
}
