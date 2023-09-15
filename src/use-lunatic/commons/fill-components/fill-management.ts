import type { LunaticComponentDefinition, LunaticState } from '../../type';

export type FilledProps = { management?: boolean };

function fillManagement(
	component: LunaticComponentDefinition,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	const { management } = state;
	if (management) {
		return { ...component, management };
	}
	return component;
}

export default fillManagement;
