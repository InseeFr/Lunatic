import PropTypes from 'prop-types';

export const allowedTypes = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
	PropTypes.object,
]);

export const selectCommonPropTypes = {
	handleChange: PropTypes.func,
	placeHolder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: allowedTypes,
};
