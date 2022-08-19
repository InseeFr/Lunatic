import React from 'react';
import './errors.scss';

function Errors({ errors }) {
	if (Array.isArray(errors)) {
		const content = errors.map(({ id, errorMessage }) => {
			return (
				<div key={`error-${id}`} className="lunatic-error">
					{errorMessage}
				</div>
			);
		});
		return <div className="lunatic-errors">{content}</div>;
	}
	return null;
}

export default Errors;
