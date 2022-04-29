import PropTypes from 'prop-types';

export default PropTypes.shape({
	min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});
