import React from 'react';
import Button from '../button';
import D from '../../i18n';

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
					{D.MODAL_CORRECT}
				</Button>
			</div>
		);
	}
	return (
		<div className="modal-buttons">
			<Button className="modal-button" onClick={onClose}>
				{D.MODAL_CORRECT}
			</Button>
			<Button className="modal-button" onClick={onSkip}>
				{D.MODAL_IGNORE}
			</Button>
		</div>
	);
}

export default CloseOrSkip;
