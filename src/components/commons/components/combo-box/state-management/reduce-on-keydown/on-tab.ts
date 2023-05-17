import { ComboBoxState } from '../index';

export function onTab(state: ComboBoxState): ComboBoxState {
	return { ...state, expanded: false, focused: false };
}
