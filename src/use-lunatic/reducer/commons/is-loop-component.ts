import { LunaticComponentDefinition } from '../../type';

export const isLoopComponent = (
	component: LunaticComponentDefinition
): component is LunaticComponentDefinition & {
	componentType: 'Loop' | 'RosterForLoop' | 'SummaryLoop';
} => {
	return ['Loop', 'RosterForLoop', 'SummaryLoop'].includes(component.componentType);
};
