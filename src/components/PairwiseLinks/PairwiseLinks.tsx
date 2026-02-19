import type { LunaticComponentProps } from '../type';
import { Fragment } from 'react';
import { LunaticComponents } from '../LunaticComponents';
import { PairwiseMirror } from './PairwiseMirror';
import { times } from '../../utils/array';

const filterCombination = ({
	combination,
	iteration,
	readonly = false,
}: {
	combination: readonly [number, number];
	iteration: number | undefined;
	readonly?: boolean;
}): boolean => {
	const [x, y] = combination;
	const base = readonly ? y > x : y < x;
	if (iteration === undefined) return base;
	return y === iteration && base;
};

export const PairwiseLinks = (
	props: LunaticComponentProps<'PairwiseLinks'>
) => {
	const { iteration, size, getComponents } = props;

	const combinations = getCombinations(size, size);

	if (combinations.length <= 1) {
		return;
	}

	return (
		<>
			{combinations
				.filter((combination) => filterCombination({ combination, iteration }))
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
					filterCombination({ combination, iteration, readonly: true })
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

const getCombinations = (
	sizeX: number,
	sizeY: number
): (readonly [number, number])[] => {
	return times(sizeY, (y) => times(sizeX, (x) => [x, y] as const)).flat(1);
};
