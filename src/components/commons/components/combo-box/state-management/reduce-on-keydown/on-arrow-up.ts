import { type ComboBoxState } from '../index';

export function onArrowUp(
	state: ComboBoxState,
	nbOptions?: number
): ComboBoxState {
	if (nbOptions) {
		const { selectedIndex } = state;

		if (selectedIndex !== undefined) {
			return {
				...state,
				selectedIndex: Math.max(selectedIndex - 1, 0),
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
