import React from 'react';
import './errors.scss';

function Errors({ errors }) {
	if (Array.isArray(errors)) {
		const content = errors.map(({ id, errorMessage }) => {
			const { value } = errorMessage;
			return (
				<div className="lunatic-error" id={id}>
					{value}
				</div>
			);
		});
		return <div className="lunatic-errors">{content}</div>;
	}
	return null;
}

export default Errors;
