import classnames from 'classnames';
import { type MouseEventHandler } from 'react';
import type { LunaticError } from '../../use-lunatic/type';
import CloseOrSkip from './close-or-skip';
import ModalContainer from './modal-container';
import './modal-controls.scss';

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

function ModalControls({ errors, isCritical, goNext, onClose }: Props) {
	if (typeof errors === 'object') {
		const content = Object.entries(errors).map(function ([id, errors]) {
			return <ComponentErrors errors={errors} key={id} />;
		}, []);

		return (
			<ModalContainer>
				<div className="body">{content}</div>
				<CloseOrSkip
					onSkip={goNext}
					onClose={onClose}
					isCritical={isCritical}
				/>
			</ModalContainer>
		);
	}
	return null;
}

export default ModalControls;
