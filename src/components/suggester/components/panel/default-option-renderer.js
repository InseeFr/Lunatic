import React from 'react';
import classnames from 'classnames';

function DefaultOptionRenderer({ option, selected }) {
	const { id, label } = option;
	return (
		<div className={classnames('lunatic-suggester-option', { selected })}>
			<span className="id">{id}</span>
			{label && (
				<>
					<span> - </span>
					<span className="label">{label}</span>
				</>
			)}
		</div>
	);
}

export default DefaultOptionRenderer;
