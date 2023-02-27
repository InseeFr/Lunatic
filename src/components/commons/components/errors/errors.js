import React from 'react';
import PropTypes from 'prop-types';
import './errors.scss';

function getActivesErrors(errors, activeId) {
	return Object.entries(errors).find(([k]) => activeId.trim().endsWith(k));
}

function Errors({ errors, activeId }) {
	const activeErrors = getActivesErrors(errors, activeId);
	if (Array.isArray(activeErrors) && Array.isArray(activeErrors[1])) {
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

Errors.propTypes = {
	errors: PropTypes.object.isRequired,
	activeId: PropTypes.string.isRequired,
};

Errors.defaultProps = { errors: {} };

export default Errors;
