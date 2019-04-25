import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		componentType: PropTypes.string.isRequired,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			})
		),
	})
);
