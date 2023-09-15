import type { LunaticComponentDefinition, LunaticState } from '../../type';

export type FilledProps = { iteration?: number };

/**
 * Inject the iteration index in the component props
 */
function fillPagination<T extends LunaticComponentDefinition>(
	component: T,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	const { pager } = state;
	const { iteration } = pager;

	return { ...component, iteration };
}

export default fillPagination;
