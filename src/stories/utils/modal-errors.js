import React, { useCallback } from 'react';
import { Button } from 'components';
import classnames from 'classnames';
import './modal-errors.scss';

function CloseOrSkip({ errors, onClose, onSkip }) {
	const bloc = Object.values(errors)
		.flat()
		.reduce(function (status, { criticality }) {
			return status || criticality === 'WARN';
		}, false);

	if (bloc) {
		return (
			<Button className="modal-button" onClick={onClose}>
				Close
			</Button>
		);
	}
	return (
		<Button className="modal-button" onClick={onSkip}>
			Next
		</Button>
	);
}

function Error({ criticality, errorMessage }) {
	const { value } = errorMessage;
	return <li className={classnames(criticality)}>{value}</li>;
}

function ComponentErrors({ errors }) {
	const content = errors.map(function (error, index) {
		return <Error {...error} key={index} />;
	}, []);
	return <ul className={classnames('errors')}>{content}</ul>;
}

function ModalErrors({ title, errors, goNext }) {
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
			<div className="modal-errors">
				<div className="modal">
					<div className="title">{title}</div>
					<div className="body">{content}</div>
					<CloseOrSkip onSkip={goNext} onClose={onClose} errors={errors} />
				</div>
			</div>
		);
	}
	return null;
}

export default ModalErrors;
