import PropTypes from 'prop-types';
import * as C from '../../../utils/constants';

export default PropTypes.oneOf([
	C.COLLECTED,
	C.PREVIOUS,
	C.FORCED,
	C.EDITED,
	C.INPUTED,
]);
