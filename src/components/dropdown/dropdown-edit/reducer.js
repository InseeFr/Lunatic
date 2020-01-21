import * as actions from '../commons/actions';
import { filterOption } from './prefix-tools';
import { preparePrefix } from './prefix-tools';
import { scrollTo } from '../commons/tools';

export const initial = {
	prefix: undefined,
	options: [],
	visibleOptions: [],
	visible: false,
	activeIndex: undefined,
	selectedOption: undefined,
	focused: false,
	value: '',
};

/** */
const isPrefix = prefix => prefix !== undefined && prefix.length > 0;

/** */
const reduceArrowDownPressed = state => {
	const { visibleOptions, activeIndex } = state;
	const next = visibleOptions.length
		? Math.min(
				visibleOptions.length - 1,
				activeIndex === undefined ? 0 : activeIndex + 1
		  )
		: undefined;
	if (next !== undefined) {
		scrollTo(`${state.id}-option-${visibleOptions[next].value}`);
	}
	return { ...state, activeIndex: next };
};

/** */
const reduceArrowUpPressed = state => {
	const { visibleOptions, activeIndex } = state;
	const next = visibleOptions.length
		? Math.max(0, activeIndex === undefined ? 0 : activeIndex - 1)
		: undefined;

	if (next !== undefined) {
		scrollTo(`${state.id}-option-${visibleOptions[next].value}`);
	}
	return { ...state, activeIndex: next };
};

/** */
const reduceEnterPressed = (state, callback) => {
	const { activeIndex, visibleOptions, visible } = state;
	if (!visible) {
		return { ...state, visible: true };
	}
	if (activeIndex !== undefined) {
		const option = visibleOptions[activeIndex];
		callback(option);
		return {
			...state,
			selectedOption: option,
			value: option.label,
			prefix: preparePrefix(option.label),
			visible: false,
		};
	}
	return state;
};

/**  */
const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case actions.SHOW_PANEL: {
			return { ...state, visible: true };
		}
		case actions.HIDE_PANEL: {
			return { ...state, visible: false };
		}
		case actions.SET_ACTIVE_OPTION: {
			const { index } = payload;
			return {
				...state,
				activeIndex: index,
			};
		}
		case actions.SET_OPTIONS: {
			const { options } = payload;
			const { prefix } = state;
			return {
				...state,
				options,
				visibleOptions: isPrefix(prefix) ? filterOption(options) : options,
			};
		}
		case actions.SET_PREFIX: {
			const { prefix } = payload;
			const { options } = state;
			return {
				...state,
				prefix,
				activeIndex: undefined,
				visibleOptions: isPrefix(prefix)
					? filterOption(options, prefix)
					: options,
			};
		}
		case actions.SET_VALUE: {
			const { value } = payload;
			return { ...state, value };
		}
		case actions.SET_SELECTED_OPTION: {
			const { option } = payload;
			return {
				...state,
				value: option.label,
				selectedOption: option,
				prefix: preparePrefix(option.label),
			};
		}
		case actions.SET_FOCUSED: {
			const { focused } = payload;
			return { ...state, focused };
		}
		case actions.RESET_SELECTION: {
			return {
				...state,
				prefix: undefined,
				value: '',
				selectedOption: undefined,
				activeIndex: undefined,
				activeOption: undefined,
				visibleOptions: state.options,
			};
		}
		case actions.ARROW_UP_PRESSED: {
			return reduceArrowUpPressed(state);
		}
		case actions.ARROW_DOWN_PRESSED: {
			return reduceArrowDownPressed(state);
		}
		case actions.ENTER_PRESSED: {
			const { callback } = payload;
			return reduceEnterPressed(state, callback);
		}
		default:
			return state;
	}
};

export default reducer;
