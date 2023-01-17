import React from 'react';
import classnames from 'classnames';

function Description({ value, className }) {
	if (
		(typeof value === 'string' && value.length > 0) ||
		React.isValidElement(value)
	) {
		return (
			<span className={classnames('label-description', className)}>
				{value}
			</span>
		);
	}

	return null;
}

export default Description;
