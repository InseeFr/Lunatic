import React from 'react';
import PropTypes from 'prop-types';

function getContent(option, search) {
	if (option) {
		const { value, label } = option;
		return label ? `${value} - ${label}` : value;
	}
	if (search && search.trim().length) {
		return search;
	}
	return null;
}

function WritableLabelRenderer({ option, placeholder, search }) {
	const content = getContent(option, search);
	if (content) {
		return <span className="selection">{content}</span>;
	}
	return <span className="placeholder">{placeholder}</span>;
}

WritableLabelRenderer.propTypes = {
	option: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
	placeholder: PropTypes.string,
	search: PropTypes.string,
};

export default WritableLabelRenderer;
