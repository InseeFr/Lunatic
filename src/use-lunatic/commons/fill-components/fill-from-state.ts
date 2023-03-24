import { LunaticComponentDefinition, LunaticState } from '../../type';

export type FilledProps = {
	handleChange: LunaticState['handleChange'];
	executeExpression: LunaticState['executeExpression'];
	preferences: LunaticState['preferences'];
	goToPage: LunaticState['goToPage'];
	shortcut: LunaticState['shortcut'];
};

function fillFromState(
	component: LunaticComponentDefinition,
	state: LunaticState
) {
	const { handleChange, executeExpression, preferences, goToPage, shortcut } = state;
	return {
		...component,
		handleChange,
		executeExpression,
		preferences,
		goToPage,
		shortcut,
	};
}

export default fillFromState;
