import { LunaticComponentDefinition, LunaticState } from '../../type';

export type FilledProps = {
	handleChange: LunaticState['handleChange'];
	executeExpression: LunaticState['executeExpression'];
	preferences: LunaticState['preferences'];
};

function fillFromState(
	component: LunaticComponentDefinition,
	state: LunaticState
) {
	const { handleChange, executeExpression, preferences } = state;
	return { ...component, handleChange, executeExpression, preferences };
}

export default fillFromState;
