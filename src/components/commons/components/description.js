import React from 'react';

function Description({ value }) {
	if (
		(typeof value === 'string' && value.length > 0) ||
		React.isValidElement(value)
	) {
		return <span className="label-description">{value}</span>;
	}

	return null;
}

export default Description;
