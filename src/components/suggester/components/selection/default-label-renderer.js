import React from 'react';
import PropTypes from 'prop-types';

function getContent(option, search) {
	if (option) {
		const { id, label } = option;
		return label ? `${id} - ${label}` : id;
	}
	if (search && search.trim().length) {
		return search;
	}
	return undefined;
}

function DefaultLabelRenderer({ option, placeholderList, search }) {
	const content = getContent(option, search);
	if (content) {
		return <span className="selection">{content}</span>;
	}
	return <span className="placeholderList">{placeholderList}</span>;
}

DefaultLabelRenderer.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
	placeholderList: PropTypes.string,
	search: PropTypes.string,
};

export default DefaultLabelRenderer;
