import {
	LunaticComponentDefinition,
	LunaticError,
	LunaticState,
} from '../../type';

export type FilledProps = {
	error?: LunaticError[];
};

function fillErrors(
	component: LunaticComponentDefinition,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	const { errors } = state;
	const { id } = component;
	if (errors) {
		// TODO only keep criticality info
		if (id in errors) {
			return { ...component, error: errors[id] };
		}
	}
	return component;
}

export default fillErrors;
