import classnames from 'classnames';
import React from 'react';
import CloseOrSkip from './close-or-skip';
import ModalContainer from './modal-container';
import './modal-controls.scss';

function Error({ criticality, errorMessage }) {
	return <li className={classnames(criticality)}>{errorMessage}</li>;
}

function ComponentErrors({ errors }) {
	const content = errors.map(function (error, index) {
		return <Error {...error} key={index} />;
	}, []);
	return <ul className={classnames('errors')}>{content}</ul>;
}

function ModalControls({ title, errors, isCritical, goNext, onClose }) {
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
					errors={errors}
					isCritical={isCritical}
				/>
			</ModalContainer>
		);
	}
	return null;
}

export default ModalControls;
