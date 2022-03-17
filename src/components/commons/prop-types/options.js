import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
	PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	})
);
