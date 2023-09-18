import getComponentValue from '../get-component-value';
import type { LunaticComponentDefinition, LunaticState } from '../../type';

export type FilledProps = { value: unknown };

function fillComponentValue(
	component: LunaticComponentDefinition,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	const value = getComponentValue(component, state);
	return { ...component, value };
}

export default fillComponentValue;
