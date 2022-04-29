import React from 'react';
import classnames from 'classnames';

function DefaultOptionRenderer({ option, selected }) {
	const { id, value, label } = option;

	if (label && label.length) {
		return (
			<div className={classnames('lunatic-combo-box-option', { selected })}>
				<span className="id">{id || value}</span>
				{label && (
					<>
						<span> - </span>
						<span className="label">{label}</span>
					</>
				)}
			</div>
		);
	}
	return (
		<div className={classnames('lunatic-combo-box-option', { selected })}>
			<span className="id">{id}</span>
		</div>
	);
}

export default DefaultOptionRenderer;
