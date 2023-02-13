import { LunaticComponentDefinition, LunaticState } from '../../type';

export type FilledProps = {
	handleChange: LunaticState['handleChange'];
	executeExpression: LunaticState['executeExpression'];
	preferences: LunaticState['preferences'];
	goToPage: LunaticState['goToPage'];
};

function fillFromState(
	component: LunaticComponentDefinition,
	state: LunaticState
) {
	const { handleChange, executeExpression, preferences, goToPage } = state;
	return {
		...component,
		handleChange,
		executeExpression,
		preferences,
		goToPage,
	};
}

export default fillFromState;
