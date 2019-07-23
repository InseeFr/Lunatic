import PropTypes from 'prop-types';

export default PropTypes.shape({
	name: PropTypes.string,
	valueState: PropTypes.arrayOf(
		PropTypes.shape({
			valueType: PropTypes.string,
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
			]),
		})
	),
});
