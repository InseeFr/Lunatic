import type { LunaticComponentDefinition, LunaticState } from '../../type';

export type FilledProps = {
	handleChange: LunaticState['handleChange'];
	executeExpression: LunaticState['executeExpression'];
	preferences: LunaticState['preferences'];
	goToPage: LunaticState['goToPage'];
	shortcut: LunaticState['shortcut'];
	goNextPage: LunaticState['goNextPage'];
	goPreviousPage: LunaticState['goPreviousPage'];
};

/**
 * Add state data as component props
 */
function fillFromState(
	component: LunaticComponentDefinition,
	state: LunaticState
) {
	const {
		handleChange,
		executeExpression,
		preferences,
		goToPage,
		shortcut,
		getSuggesterStatus,
		goNextPage,
		goPreviousPage,
	} = state;
	return {
		...component,
		handleChange,
		executeExpression,
		preferences,
		goToPage,
		shortcut,
		getSuggesterStatus,
		goNextPage,
		goPreviousPage,
	};
}

export default fillFromState;
