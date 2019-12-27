export const SHOW_PANEL = "dropdown/show-panel";
export const showPanel = () => ({ type: SHOW_PANEL });

export const HIDE_PANEL = "dropdown/hide-panel";
export const hidePanel = () => ({ type: HIDE_PANEL });

export const SET_ACTIVE_OPTION = "dropdown/set-active-option";
export const setActiveOption = index => ({
  type: SET_ACTIVE_OPTION,
  payload: { index }
});

export const SET_OPTIONS = "dropdown/set-options";
export const setOptions = options => ({
  type: SET_OPTIONS,
  payload: { options }
});

export const SET_VALUE = "dropdown/set-value";
export const setValue = value => ({ type: SET_VALUE, payload: { value } });

export const SET_FOCUSED = "dropdown/set-focused";
export const setFocused = focused => ({
  type: SET_FOCUSED,
  payload: { focused }
});

export const SET_SELECTED_OPTION = "dropdown/set-selectted-option";
export const setSelectedOption = option => ({
  type: SET_SELECTED_OPTION,
  payload: { option }
});

export const RESET_SELECTION = "dropdown/reset-selection";
export const resetSelection = option => ({
  type: RESET_SELECTION
});

/* */
export const ARROW_UP_PRESSED = "dropdown/arrow-up-ressed";
export const arrowUpPressed = () => ({ type: ARROW_UP_PRESSED });

/* */
export const ARROW_DOWN_PRESSED = "dropdown/arrow-down-pressed";
export const arrowDownPressed = () => ({ type: ARROW_DOWN_PRESSED });

/* */
export const ENTER_PRESSED = "dropdown/enter-pressed";
export const enterPressed = callback => ({
  type: ENTER_PRESSED,
  payload: { callback }
});

/*  */
export const SET_PREFIX = "dropdown/set-prefix";
export const setPrefix = prefix => ({ type: SET_PREFIX, payload: { prefix } });
