import { LunaticComponentDefinition } from '../type';

function isPaginatedLoop(
	component: LunaticComponentDefinition
): component is LunaticComponentDefinition & {
	componentType: 'Loop';
	paginatedLoop: true;
} {
	return component.componentType === 'Loop' && component.paginatedLoop;
}

export default isPaginatedLoop;
