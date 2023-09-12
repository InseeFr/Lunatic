import { Modal } from './html/modal';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import { LunaticComponentProps } from '../type';
import { MouseEventHandler, useEffect, useRef } from 'react';
import { isEventInRect } from '../../utils/dom';

function empty() {}

function LunaticModal(props: LunaticComponentProps<'Modal'>) {
	const { id, label, description, goNextPage, goPreviousPage } = props;

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

	return (
		<LunaticComponent
			id={id}
			label={label}
			handleChange={empty}
			value={undefined}
			description={description}
		>
			<Modal
				dialogRef={dialogRef}
				onClose={handleClose}
				onCancel={handleCancel}
				onClick={handleDialogClick}
				id={id}
				label={label}
				description={description}
			/>
		</LunaticComponent>
	);
}

export default LunaticModal;
