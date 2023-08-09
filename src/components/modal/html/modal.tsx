import { useCallback } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import { LunaticComponentProps } from '../../type';
import { createPortal } from 'react-dom';
import './modal.scss';
import Button from '../../button';

function Modal(
	props: Pick<
		LunaticComponentProps<'Modal'>,
		| 'id'
		| 'label'
		| 'description'
		| 'goToPage'
		| 'page'
		| 'goNextPage'
		| 'goPreviousPage'
	>
) {
	const { id, label, description, goNextPage, goPreviousPage } = props;

	const handleNextClick = useCallback(
		function () {
			goNextPage();
		},
		[goNextPage]
	);
	const handlePreviousClick = useCallback(
		function () {
			goPreviousPage();
		},
		[goPreviousPage]
	);

	return createPortal(
		<div className="lunatic-modal">
			<div className="modal-content">
				<div id={id} className="lunatic-modal-container">
					<div className="close-button">
						<a onClick={handlePreviousClick}>fermer x</a>
					</div>
					<div className="modal-message">
						<span>{label}</span>
						<span>{description}</span>
					</div>
					<Button onClick={handlePreviousClick}>Annuler</Button>
					<Button onClick={handleNextClick}>Je confirme</Button>
				</div>
			</div>
		</div>,
		document.body
	);
}
export default createCustomizableLunaticField(Modal, 'Modal');
