import PropTypes from 'prop-types';
import * as C from '../constants';

export default PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.string.isRequired,
		declarationType: PropTypes.oneOf([
			C.INSTRUCTION,
			C.COMMENT,
			C.HELP,
			C.WARNING,
		]),
		position: PropTypes.oneOf([
			C.BEFORE_QUESTION_TEXT,
			C.AFTER_QUESTION_TEXT,
			C.DETACHABLE,
		]),
		label: PropTypes.string.isRequired,
	})
).isRequired;
