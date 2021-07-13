import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Fab } from '../../../../utils/components/fab';
import CrossIcon from '../../../../utils/icons/cross.icon';

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

function Delete({ className, search, onClick }) {
	const onKeyDown = useMemo(() => createOnKeyDown(onClick), [onClick]);
	return (
		<Fab
			className={classnames('mini', 'lunatic-suggester-fab', className)}
			tabIndex="0"
			title="delete"
			onClick={onClick}
			disabled={isDisabled(search)}
			onKeyDown={onKeyDown}
		>
			<CrossIcon className="lunatic-suggester-icon" />
		</Fab>
	);
}

export default Delete;
