import React from 'react';
import './errors.scss';

function Errors({ errors, activeId }) {
	const activeErrors = Object.entries(errors || {}).find(([k]) =>
		activeId.trim().endsWith(k)
	);
	if (!activeErrors) return null;
	if (Array.isArray(activeErrors[1])) {
		const content = activeErrors[1].map(({ id, errorMessage }) => {
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
