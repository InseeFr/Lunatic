import type { LunaticComponentDefinition } from '../type';

export function isPaginatedLoop(
	component: LunaticComponentDefinition
): component is LunaticComponentDefinition & {
	componentType: 'Loop';
	paginatedLoop: true;
} {
	return component.componentType === 'Loop' && component.paginatedLoop;
}
