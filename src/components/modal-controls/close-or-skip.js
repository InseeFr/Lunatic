import React from 'react';
import Button from '../button';

function CloseOrSkip({ errors, onClose, onSkip }) {
	const flattenErrors = Object.values(errors).flat();
	const bloc = flattenErrors.reduce(function (status, { criticality }) {
		return status || criticality === 'WARN';
	}, false);
	const onlyCorrect = flattenErrors
		.map(({ blocking }) => blocking)
		.includes(true);

	if (bloc) {
		return (
			<div className="modal-buttons">
				<Button className="modal-button" onClick={onClose}>
					Correct
				</Button>
				{!onlyCorrect && (
					<Button className="modal-button" onClick={onSkip}>
						Ignore
					</Button>
				)}
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
