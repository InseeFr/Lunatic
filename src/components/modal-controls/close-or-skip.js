import React from 'react';
import Button from '../button';

function CloseOrSkip({ errors, onClose, onSkip }) {
	const bloc = Object.values(errors)
		.flat()
		.reduce(function (status, { criticality }) {
			return status || criticality === 'WARN';
		}, false);

	if (bloc) {
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
	return (
		<Button className="modal-button" onClick={onSkip}>
			Next
		</Button>
	);
}

export default CloseOrSkip;
