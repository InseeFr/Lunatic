import { useEffect, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import type { LunaticComponentProps } from '../../type';
import { createCustomizableLunaticField } from '../../commons';
import { createPortal } from 'react-dom';
import './modal.scss';
import Button from '../../button';
import { isEventInRect } from '../../../utils/dom';

type Props = Pick<
	LunaticComponentProps<'Modal'>,
	| 'id'
	| 'label'
	| 'description'
	| 'goToPage'
	| 'page'
	| 'goNextPage'
	| 'goPreviousPage'
>;

function ModalPure({
	id,
	label,
	description,
	goNextPage,
	goPreviousPage,
}: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		// Browser behaviour is different for dialog displayed with this API, it creates de dialog with backdrop
		dialogRef.current?.showModal();
	}, []);

	const handleClose = () => {
		// A cancel button was pressed
		if (dialogRef.current?.returnValue === 'cancel') {
			handleCancel();
			return;
		}
		goNextPage();
	};

	const handleCancel = () => {
		goPreviousPage();
	};

	const handleDialogClick: MouseEventHandler<HTMLDialogElement> = (e) => {
		// Cancel the modal on backdrop blick
		if (!isEventInRect(e, dialogRef.current!.getBoundingClientRect())) {
			handleCancel();
		}
	};

	return createPortal(
		<dialog
			onClose={handleClose}
			onCancel={handleCancel}
			className="lunatic-modal"
			ref={dialogRef}
			id={id}
			onClick={handleDialogClick}
		>
			<form method="dialog">
				<div className="lunatic-modal_title">{label}</div>
				<div className="lunatic-modal_description">{description}</div>
				<div className="lunatic-modal_buttons">
					<Button type="submit" value="default">
						Je confirme
					</Button>
					<Button type="submit" value="cancel">
						Annuler
					</Button>
				</div>
				<Button type="submit" value="cancel" className="lunatic-modal_close">
					fermer <span aria-hidden>x</span>
				</Button>
			</form>
		</dialog>,
		document.body
	);
}

export const Modal = createCustomizableLunaticField(ModalPure, 'Modal');
