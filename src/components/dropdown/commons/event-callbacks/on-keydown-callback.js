import * as actions from "../actions";

export const BINDED_KEYS = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  enter: "Enter",
  tab: "Tab"
};

/** */
export default (_, dispatch, onSelect) => key => {
  switch (key) {
    case BINDED_KEYS.arrowUp:
      dispatch(actions.arrowUpPressed());
      //   dispatch(actions.showPanel());
      break;
    case BINDED_KEYS.arrowDown:
      dispatch(actions.arrowDownPressed());
      dispatch(actions.showPanel());
      break;
    case BINDED_KEYS.enter:
      dispatch(actions.enterPressed(onSelect));
      break;
    case BINDED_KEYS.tab:
      dispatch(actions.setFocused(false));
      dispatch(actions.hidePanel());
      break;
    default:
  }
};
