import type { LunaticComponentDefinition } from '../type';

export function isRoundabout(
	component: LunaticComponentDefinition
): component is LunaticComponentDefinition<'Roundabout'> {
	const { componentType } = component;
	return componentType === 'Roundabout';
}
