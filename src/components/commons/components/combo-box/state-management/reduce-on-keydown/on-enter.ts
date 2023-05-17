import { ComboBoxState } from '../index';

export function onEnter(state: ComboBoxState): ComboBoxState {
	const { expanded } = state;
	return { ...state, expanded: !expanded, focused: true };
}
