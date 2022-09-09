import React from 'react';
import Button from '../button';

function CloseOrSkip({ errors, onClose, onSkip }) {
	const flattenErrors = Object.values(errors).flat();
	const bloc = flattenErrors.reduce(function (
		status,
		{ criticality, typeOfControl }
	) {
		return status || (typeOfControl === 'FORMAT' && criticality === 'ERROR');
	},
	false);

	if (bloc) {
		return (
			<div className="modal-buttons">
				<Button className="modal-button" onClick={onClose}>
					Correct
				</Button>
			</div>
		);
	}
	return (
		<div className="modal-buttons">
			<Button className="modal-button" onClick={onClose}>
				Correct
			</Button>
			<Button className="modal-button" onClick={onSkip}>
				Ignore
			</Button>
		</div>
	);
}

export default CloseOrSkip;
