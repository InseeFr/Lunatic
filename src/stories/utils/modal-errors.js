import React from 'react';
import { Button } from 'components';
import './modal-errors.scss';

function ModalErrors({ errors, goNext }) {
	if (typeof errors === 'object') {
		return (
			<div className="modal-errors">
				<div className="modal">
					<div className="title">Des erreurs...</div>
					<div className="body">Pas Bien !</div>
					<Button className="modal-button" onClick={goNext}>
						Next
					</Button>
				</div>
			</div>
		);
	}
	return null;
}

export default ModalErrors;
