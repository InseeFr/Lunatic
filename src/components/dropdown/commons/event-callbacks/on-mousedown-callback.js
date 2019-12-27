import * as CLEAN from '../cleaner-callbacks';
import * as actions from '../actions';

/** */
export default ({ visible, id, disabled }, dispatch) => e => {
	e.stopPropagation();
	if (!visible && !disabled) {
		CLEAN.applyAll(id);
		dispatch(actions.showPanel());
	}
};
