import React, { useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import findBestLabel from '../../../components/suggester/find-best-label';
import './theme.scss';

function getLabel(option, attribut) {
	const { libelle1, libelle2, code } = option;
	switch (attribut) {
		case 'libelle2':
			return `${code} - ${libelle2}`;
		case 'libelle1':
		case 'code':
			return `${code} - ${libelle1}`;
		default:
			return ``;
	}
}

function OptionBailleurRenderer({ option, selected, search }) {
	const { typorg } = option;
	const [computed, setComputed] = useState(false);
	const [attribut, setAttribut] = useState(undefined);

	useEffect(
		function () {
			let unmount = false;
			async function doIt() {
				const best = await findBestLabel(option, search);
				if (!unmount) {
					setAttribut(best);
					setComputed(true);
				}
			}

			doIt();

			return function () {
				unmount = true;
			};
		},
		[option, search]
	);

	return (
		<div
			className={classnames('option-bailleur', `type-${typorg}`, {
				selected,
				computed,
			})}
		>
			<span className={classnames('bailleur-label', {})} title={attribut}>
				{getLabel(option, attribut)}
			</span>
		</div>
	);
}

export default OptionBailleurRenderer;
