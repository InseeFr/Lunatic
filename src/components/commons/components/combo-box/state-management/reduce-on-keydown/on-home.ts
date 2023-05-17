import { ComboBoxState } from '../index';

export function onHome(
	state: ComboBoxState,
	nbOptions?: number
): ComboBoxState {
	if (nbOptions) {
		return {
			...state,
			selectedIndex: 0,
			expanded: true,
		};
	}

	return { ...state, expanded: true };
}
