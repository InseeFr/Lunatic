import React from 'react';
import classnames from 'classnames';

function SimpleOptionRenderer({ option, selected }) {
	const { value, label } = option;

	if (label && label.length) {
		return (
			<div className={classnames('lunatic-combo-box-option', { selected })}>
				<span className="id">{value}</span>
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
			<span className="id">{value}</span>
		</div>
	);
}

export default SimpleOptionRenderer;
