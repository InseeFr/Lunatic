import { ComboBoxState } from './index';
import { ComboAction, ComboActionKind } from './actions';

function reduceOnInit(
	state: ComboBoxState,
	action: ComboAction<ComboActionKind.ON_INIT>
): ComboBoxState {
	const { payload } = action;
	const { options, value, getOptionValue } = payload;

	if (Array.isArray(options) && value !== undefined) {
		const next = options.reduce((current, option, index) => {
			const optionValue = getOptionValue(option);
			if (
				value &&
				typeof value === 'object' &&
				'ID' in value &&
				value.ID === optionValue
			) {
				return index;
			}
			if (value === optionValue) {
				return index;
			}
			return current;
		}, undefined as undefined | number);
		return { ...state, selectedIndex: next };
	}

	if (!value) {
		return { ...state, selectedIndex: undefined };
	}

	return state;
}

export default reduceOnInit;
