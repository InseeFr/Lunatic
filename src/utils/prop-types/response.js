import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
	PropTypes.shape({
		name: PropTypes.string.isRequired,
		valueState: PropTypes.arrayOf(
			PropTypes.shape({
				valueType: PropTypes.string.isRequired,
				value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
			})
		),
	})
);
