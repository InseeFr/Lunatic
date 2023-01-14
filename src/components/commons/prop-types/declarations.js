import PropTypes from 'prop-types';
import * as C from '../../../constants';

export default PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.string.isRequired,
		declarationType: PropTypes.oneOf([
			C.INSTRUCTION,
			C.COMMENT,
			C.HELP,
			C.WARNING,
			C.MESSAGE_FILTER,
			C.STATEMENT,
		]),
		position: PropTypes.oneOf([
			C.BEFORE_QUESTION_TEXT,
			C.AFTER_QUESTION_TEXT,
			C.DETACHABLE,
		]),
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
			.isRequired,
	})
).isRequired;
