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
	const page = getPageTag(state.pager);
	const errors = state.errors?.[page];

	return { ...component, errors };
}

export default fillErrors;
