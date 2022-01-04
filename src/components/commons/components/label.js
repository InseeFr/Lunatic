import React from 'react';

function Label({ children, id, htmlFor, className }) {
	if (children) {
		return (
			<label htmlFor={htmlFor} id={id} className={className}>
				{children}
			</label>
		);
	}
	return null;
}

export default Label;
