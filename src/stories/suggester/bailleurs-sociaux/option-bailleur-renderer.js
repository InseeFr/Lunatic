import React, { useEffect, useState, useMemo } from 'react';
import distance from 'damerau-levenshtein';
import classnames from 'classnames';
import createTokenizer from './create-tokenizer';
import './theme.scss';

function computeScore(search, tokens) {
	return search.reduce(function (score, word) {
		return (
			score +
			tokens.reduce(function (t, token) {
				return t + distance(word, token).similarity;
			}, 0)
		);
	}, 0);
}

function findBestLabel({ search, ...keys }, defaultKey) {
	let bestScore = -1;

	return Object.entries(keys).reduce(function (best, [key, tokens]) {
		const score = computeScore(search, tokens);

		if (score > bestScore) {
			bestScore = score;
			return key;
		}
		return best;
	}, defaultKey);
}

function OptionBailleurRenderer({ option, selected, search }) {
	const { label: il, typorg, libelle1, libelle2 } = option;
	const [computed, setComputed] = useState(false);
	const [label, setLabel] = useState(il);
	const tokenize = useMemo(() => createTokenizer(), []);

	useEffect(
		function () {
			let unmount = false;
			async function doIt() {
				const tokensMap = await tokenize({
					input: { search, libelle1, libelle2 },
				});
				const best = findBestLabel(tokensMap, libelle1);
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
		[libelle1, libelle2, search, tokenize]
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
