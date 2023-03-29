import React from 'react';
import ReactDOM from 'react-dom';

function ModalContainer({ children }) {
	return ReactDOM.createPortal(
		<div className="lunatic-modal-controls">
			<div className="modal-content">{children}</div>
		</div>,
		document.body
	);
}

export default ModalContainer;
