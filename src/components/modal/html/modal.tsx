import { useCallback, useEffect, useRef, KeyboardEvent } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import { LunaticComponentProps } from '../../type';
import { createPortal } from 'react-dom';
import './modal.scss';
import Button from '../../button';

function Modal(
	props: Pick<
		LunaticComponentProps<'ConfirmationModal'>,
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
	const first = useRef<HTMLDivElement>(null);
	const last = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const focusOnInit = first?.current?.lastElementChild as HTMLButtonElement;
		focusOnInit.focus();
	}, [first]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLElement>) => {
			const firstButtonToFocus = first?.current
				?.lastElementChild as HTMLButtonElement;
			const lastButtonToFocus = last?.current
				?.lastElementChild as HTMLButtonElement;
			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === firstButtonToFocus) {
						lastButtonToFocus.focus();
						e.nativeEvent.preventDefault();
					}
				} else if (document.activeElement === lastButtonToFocus) {
					firstButtonToFocus.focus();
					e.nativeEvent.preventDefault();
				}
			}
		},
		[first, last]
	);

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
		<dialog className="lunatic-modal" open>
			<div className="modal-content" onKeyDown={onKeyDown}>
				<div id={id} className="lunatic-modal-container">
					<div className="close-button" ref={first}>
						<Button onClick={handlePreviousClick}>fermer x</Button>
					</div>
					<div className="modal-message">
						<span>{label}</span>
						<span>{description}</span>
					</div>
					<div className="cancel-confirm-buttons" ref={last}>
						<Button onClick={handlePreviousClick}>Annuler</Button>
						<Button onClick={handleNextClick}>Je confirme</Button>
					</div>
				</div>
			</div>
		</dialog>,
		document.body
	);
}
export default createCustomizableLunaticField(Modal, 'Modal');
