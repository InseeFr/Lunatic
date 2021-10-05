import React from 'react';
import classnames from 'classnames';
import './theme.scss';

function OptionBailleurRenderer({ option, selected }) {
	const { label, typorg } = option;
	return (
		<div
			className={classnames('option-bailleur', `type-${typorg}`, { selected })}
		>
			<span className="bailleur-label">{label}</span>
		</div>
	);
}

export default OptionBailleurRenderer;
