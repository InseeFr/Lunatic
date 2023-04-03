import { ComboBoxState } from '../index';

export function onArrowDown(
	state: ComboBoxState,
	nbOptions?: number
): ComboBoxState {
	if (nbOptions) {
		const { selectedIndex } = state;

		if (selectedIndex !== undefined) {
			return {
				...state,
				selectedIndex: Math.min(selectedIndex + 1, nbOptions - 1),
				expanded: true,
			};
		}
		return {
			...state,
			selectedIndex: 0,
			expanded: true,
		};
	}

	return { ...state, expanded: true };
}
