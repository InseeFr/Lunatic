import React, { MouseEventHandler } from 'react';
import D from '../../i18n';
import Button from '../button';

type Props = {
	onClose: MouseEventHandler;
	onSkip: MouseEventHandler;
	isCritical?: boolean;
};

function CloseOrSkip({ onClose, onSkip, isCritical }: Props) {
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
