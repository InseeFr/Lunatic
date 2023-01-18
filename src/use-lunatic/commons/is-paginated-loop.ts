import { LunaticComponent } from '../type';

function isPaginatedLoop(
	component: LunaticComponent
): component is LunaticComponent & {
	componentType: 'Loop';
	paginatedLoop: true;
} {
	return component.componentType === 'Loop' && component.paginatedLoop;
}

export default isPaginatedLoop;
