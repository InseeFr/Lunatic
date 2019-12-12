import * as actions from "../commons/actions";
import { scrollTo } from "../commons/tools";

export const initial = {
  options: [],
  visible: false,
  activeIndex: undefined,
  selectedOption: undefined,
  focused: false,
  value: ""
};

/** */
const reduceArrowDownPressed = state => {
  const { options, activeIndex } = state;
  const next = options.length
    ? Math.min(
        options.length - 1,
        activeIndex === undefined ? 0 : activeIndex + 1
      )
    : undefined;
  if (next !== undefined) {
    scrollTo(`${state.id}-option-${options[next].value}`);
  }
  return { ...state, activeIndex: next };
};

/** */
const reduceArrowUpPressed = state => {
  const { options, activeIndex } = state;
  const next = options.length
    ? Math.max(0, activeIndex === undefined ? 0 : activeIndex - 1)
    : undefined;

  if (next !== undefined) {
    scrollTo(`${state.id}-option-${options[next].value}`);
  }
  return { ...state, activeIndex: next };
};

/** */
const reduceEnterPressed = (state, callback) => {
  const { activeIndex, options, visible } = state;
  if (!visible) {
    return { ...state, visible: true };
  }
  if (activeIndex !== undefined) {
    const option = options[activeIndex];
    callback(option);
    return {
      ...state,
      selectedOption: option,
      value: option.label,
      visible: false
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
        activeIndex: index
      };
    }
    case actions.SET_OPTIONS: {
      const { options } = payload;
      return {
        ...state,
        options
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
        selectedOption: option
      };
    }
    case actions.SET_FOCUSED: {
      const { focused } = payload;
      return { ...state, focused };
    }
    case actions.RESET_SELECTION: {
      return {
        ...state,
        value: "",
        selectedOption: undefined,
        activeIndex: undefined,
        activeOption: undefined
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
