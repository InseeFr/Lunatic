import React from 'react';
import classnames from 'classnames';

function DefaultOptionRenderer({ option, selected }) {
	const { id, label } = option;
	return (
		<div
			className={classnames('lunatic-suggester-default-option', { selected })}
		>
			{label || id}
		</div>
	);
}

export default DefaultOptionRenderer;
