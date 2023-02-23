import {
	LunaticComponentDefinition,
	LunaticError,
	LunaticState,
} from '../../type';
import { getPageTag } from '../page-tag';

export type FilledProps = {
	error?: LunaticError[];
};

function fillErrors(
	component: LunaticComponentDefinition,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	const { id } = component;
	const page = getPageTag(state.pager);
	const errors = state.errors?.[page] ?? {};
	if (errors) {
		// TODO only keep criticality info
		if (id in errors && errors) {
			return { ...component, error: errors[id] };
		}
	}
	return component;
}

export default fillErrors;
