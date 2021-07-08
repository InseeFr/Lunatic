import React from 'react';
import classnames from 'classnames';
import './theme.scss';

function OptionCogRenderer({ option, selected }) {
	const { libelle, com } = option;
	return (
		<div className={classnames('cog-option', { selected })}>
			<span className="code">{com}</span>
			<span className="libelle">{libelle}</span>
		</div>
	);
}

export default OptionCogRenderer;
