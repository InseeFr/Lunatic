import type { MouseEventHandler, ReactEventHandler, RefObject } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../button';
import { createCustomizableLunaticField } from '../../commons';
import type { LunaticComponentProps } from '../../type';
import './modal.scss';

type Props = Pick<
	LunaticComponentProps<'ConfirmationModal'>,
	'id' | 'label' | 'description'
> & {
	onClose: ReactEventHandler<HTMLDialogElement>;
	onCancel: ReactEventHandler<HTMLDialogElement>;
	onClick: MouseEventHandler<HTMLDialogElement>;
	dialogRef: RefObject<HTMLDialogElement>;
};

function ModalPure({
	id,
	label,
	description,
	onClose,
	onCancel,
	onClick,
	dialogRef,
}: Props) {
	return createPortal(
		<dialog
			onClose={onClose}
			onCancel={onCancel}
			className="lunatic-modal"
			ref={dialogRef}
			id={id}
			onClick={onClick}
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
