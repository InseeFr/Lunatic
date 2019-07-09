import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
	PropTypes.shape({
		collected: PropTypes.arrayOf(PropTypes.string),
		calculated: PropTypes.arrayOf(PropTypes.string),
		external: PropTypes.arrayOf(PropTypes.string),
	})
);
