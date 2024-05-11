import classnames from 'classnames';
import { type MouseEventHandler, type ReactPortal } from 'react';
import type { LunaticError } from '../../../use-lunatic/type';
import ReactDOM from 'react-dom';
import { Button } from '../Button/Button';
import D from '../../../i18n';

type Props = {
	goNext: MouseEventHandler;
	onClose: MouseEventHandler;
	isCritical?: boolean;
	errors: Record<string, LunaticError[]>;
};

function ErrorItem({ criticality, errorMessage }: LunaticError) {
	return <li className={classnames(criticality)}>{errorMessage}</li>;
}

function ComponentErrors({ errors }: { errors: LunaticError[] }) {
	const content = errors.map(function (error, index) {
		return <ErrorItem {...error} key={index} />;
	}, []);
	return <ul className={classnames('errors')}>{content}</ul>;
}

export function ModalControls(props: Props): ReactPortal | null {
	if (typeof props.errors !== 'object') {
		return null;
	}

	const errors = Object.values(props.errors).flat();

	return ReactDOM.createPortal(
		<div className="lunatic-modal-controls">
			<div className="modal-content">
				<div className="body">
					<ComponentErrors errors={errors} />
				</div>
				<CloseOrSkip {...props} />
			</div>
		</div>,
		document.body
	);
}

function CloseOrSkip({ onClose, goNext, isCritical }: Props) {
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
			<Button className="modal-button" onClick={goNext}>
				{D.MODAL_IGNORE}
			</Button>
		</div>
	);
}
