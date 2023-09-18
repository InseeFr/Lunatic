import { type ComboBoxState } from '../index';

export function onEscape(state: ComboBoxState): ComboBoxState {
	return { ...state, expanded: false, focused: true };
}
