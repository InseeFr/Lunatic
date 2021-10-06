import React, { useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import createFindBestLabel from './create-find-best-label';
import './theme.scss';

function OptionBailleurRenderer({ option, selected, search }) {
	const { label: il, typorg } = option;
	const [computed, setComputed] = useState(false);
	const [label, setLabel] = useState(il);
	const findLabel = useMemo(() => createFindBestLabel(), []);
	const { tokensMap } = option;

	useEffect(
		function () {
			let unmount = false;
			async function doIt() {
				const best = await findLabel(option, search);

				if (!unmount) {
					setLabel(option[best]);
					setComputed(true);
				}
			}

			doIt();

			return () => {
				unmount = true;
			};
		},
		[tokensMap, search, findLabel]
	);

	return (
		<div
			className={classnames('option-bailleur', `type-${typorg}`, {
				selected,
				computed,
			})}
		>
			<span className={classnames('bailleur-label', {})}>{label}</span>
		</div>
	);
}

export default OptionBailleurRenderer;
