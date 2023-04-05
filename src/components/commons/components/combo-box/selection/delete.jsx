import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Fab } from '../../fab';
import { CrossIcon } from '../../../icons';

function isDisabled(search) {
	return !search || search.trim().length === 0;
}

function createOnKeyDown(onClick) {
	if (typeof onClick === 'function') {
		return function onKeyDown(e) {
			const { key } = e;
			if (key === 'Enter') {
				onClick();
			}
		};
	}
	return () => null;
}

function Delete({ className, search, onClick, editable }) {
	const onKeyDown = useMemo(() => createOnKeyDown(onClick), [onClick]);
	if (editable) {
		return (
			<Fab
				className={classnames('mini', 'lunatic-combo-box-fab', className)}
				title="delete"
				onClick={onClick}
				disabled={isDisabled(search)}
				onKeyDown={onKeyDown}
			>
				<CrossIcon className="lunatic-combo-box-icon" />
			</Fab>
		);
	}
	return null;
}

export default Delete;
