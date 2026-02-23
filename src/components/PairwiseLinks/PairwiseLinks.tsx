import type { LunaticComponentProps } from '../type';
import { Fragment } from 'react';
import { LunaticComponents } from '../LunaticComponents';
import { PairwiseMirror } from './PairwiseMirror';
import { filterCombinations, getCombinations } from './combinations';

export const PairwiseLinks = (
	props: LunaticComponentProps<'PairwiseLinks'>
) => {
	const { iteration, size, getComponents } = props;

	// We only need to display a pairwise if there are at least 2 guys
	if (size < 2) {
		return;
	}

	const combinations = getCombinations(size);

	return (
		<>
			{combinations
				.filter((combination) => filterCombinations({ combination, iteration }))
				.map(([x, y]) => (
					<LunaticComponents
						key={`${x}-${y}`}
						components={getComponents(x, y)}
						componentProps={(props) => ({
							...props,
							id: `${props.id}-${x + 1}-${y + 1} `,
						})}
					/>
				))}
			{combinations
				.filter((combination) =>
					filterCombinations({ combination, iteration, isSymLink: true })
				)
				.map(([x, y]) => {
					const components = getComponents(x, y);
					const firstComponent = components[0];
					if (firstComponent?.componentType !== 'Dropdown') {
						return (
							<div key={'PairwiseLinksLoop-error'}>
								First child component of a pairwise link must be a dropdown
							</div>
						);
					}
					return (
						<Fragment key={`${x}-${y}`}>
							<PairwiseMirror {...firstComponent} />
						</Fragment>
					);
				})}
		</>
	);
};
