import React from 'react';
import Button from '../button';
import './modal.scss';

const Modal = ({ cancelModal, validateModal }) => (
	<div className="lunatic-modal">
		<div className="lunatic-modal-content">
			<div className="lunatic-modal-text">
				<p>Controls</p>
			</div>
			<div className="lunatic-modal-buttons">
				<div className="lunatic-modal-button">
					<Button value="Corriger ma réponse" onClick={cancelModal} />
				</div>
				<div className="lunatic-modal-button">
					<Button value="Continuer" onClick={validateModal} />
				</div>
			</div>
		</div>
	</div>
);

export default Modal;
