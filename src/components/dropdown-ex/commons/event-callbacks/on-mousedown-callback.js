import * as CLEAN from "../cleaner-callbacks";
import * as actions from "../actions";

/** */
export default ({ visible, id }, dispatch) => e => {
  e.stopPropagation();
  if (!visible) {
    CLEAN.applyAll(id);
    dispatch(actions.showPanel());
  }
};
