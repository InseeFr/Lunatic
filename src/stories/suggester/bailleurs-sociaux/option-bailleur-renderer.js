import React, { useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
// import createFindBestLabel from './create-find-best-label';
import findBestLabel from './find-best-label';
import './theme.scss';

function getLabel(option, attribut) {
	const { libelle1, libelle2, code } = option;
	switch (attribut) {
		case 'libelle2':
			return `${code} - ${libelle2}`;
		default:
			return `${code} - ${libelle1}`;
	}
}

function OptionBailleurRenderer({ option, selected, search }) {
	const { typorg } = option;
	const [computed, setComputed] = useState(false);
	const [attribut, setAttribut] = useState('libelle1');

	const { tokensMap } = option;

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

			return () => {
				unmount = true;
			};
		},
		[tokensMap, search]
	);

	return (
		<div
			className={classnames('option-bailleur', `type-${typorg}`, {
				selected,
				computed,
			})}
		>
			<span className={classnames('bailleur-label', {})}>
				{getLabel(option, attribut)}
			</span>
		</div>
	);
}

export default OptionBailleurRenderer;
