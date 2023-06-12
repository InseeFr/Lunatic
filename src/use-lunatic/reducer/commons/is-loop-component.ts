import { LunaticComponentDefinition } from '../../type';

export const isLoopComponent = (
	component: LunaticComponentDefinition
): component is LunaticComponentDefinition & {
	componentType: 'Loop' | 'RosterForLoop';
} => {
	return ['Loop', 'RosterForLoop'].includes(component.componentType);
};
