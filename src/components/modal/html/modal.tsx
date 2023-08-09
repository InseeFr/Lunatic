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
	const { id, label, description, goToPage, page, goNextPage, goPreviousPage } =
		props;

	const handleNextClick = useCallback(
		function () {
			// If goNextPage is explicitly passed down by the orchestrator, it is used.
			if (goNextPage) {
				goNextPage();
			} else {
				// Else we go to page n+1
				const nextPage = parseInt(page) + 1;
				goToPage({
					page: `${nextPage}`,
				});
			}
		},
		[goToPage, page, goNextPage]
	);
	const handlePreviousClick = useCallback(
		function () {
			// If goPreviousPage is explicitly passed down by the orchestrator, it is used.
			if (goPreviousPage) {
				goPreviousPage();
			} else {
				// Else we go to page n-1
				const previousPage = parseInt(page) - 1;
				goToPage({
					page: `${previousPage}`,
				});
			}
		},
		[goToPage, page, goPreviousPage]
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
