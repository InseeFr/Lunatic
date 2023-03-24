import React from 'react';
import D from '../../i18n';
import Button from '../button';

function CloseOrSkip({ errors, onClose, onSkip, isCritical }) {
	if (isCritical) {
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
