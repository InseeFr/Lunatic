import React from 'react';
import classnames from 'classnames';
import './theme.scss';

function OptionCogRenderer({ option, selected }) {
	const { label, id } = option;
	return (
		<div className={classnames('cog-option', { selected })}>
			<span className="id">{id}</span>
			<span className="label">{label}</span>
		</div>
	);
}

export default OptionCogRenderer;
