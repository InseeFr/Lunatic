import { type ComboBoxState } from '../index';

export function onEnd(state: ComboBoxState, nbOptions?: number): ComboBoxState {
	if (nbOptions) {
		return {
			...state,
			selectedIndex: nbOptions - 1,
			expanded: true,
		};
	}

	return { ...state, expanded: true };
}
