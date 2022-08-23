import React, { useCallback } from 'react';
import classnames from 'classnames';
import ModalContainer from './modal-container';
import CloseOrSkip from './close-or-skip';
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

function ModalControls({ title, errors, goNext }) {
	const onClose = useCallback(
		function () {
			goNext({ block: true });
		},
		[goNext]
	);
	if (typeof errors === 'object') {
		const content = Object.entries(errors).map(function ([id, errors]) {
			return <ComponentErrors errors={errors} key={id} />;
		}, []);

		return (
			<ModalContainer>
				<div className="title">{title}</div>
				<div className="body">{content}</div>
				<CloseOrSkip onSkip={goNext} onClose={onClose} errors={errors} />
			</ModalContainer>
		);
	}
	return null;
}

export default ModalControls;
