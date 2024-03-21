import type { LunaticComponentProps } from '../type';
import { times } from '../../utils/array';
import React, { Fragment } from 'react';
import { LunaticComponents } from '../LunaticComponents';
import { Declarations } from '../shared/Declarations/Declarations';
import { Label } from '../shared/Label/Label';
import type { FilledLunaticComponentProps } from '../../use-lunatic/commons/fill-components/fill-components';

export const PairwiseLinks = ({
	declarations,
	xAxisIterations,
	yAxisIterations,
	id,
	getComponents,
}: LunaticComponentProps<'PairwiseLinks'>) => {
	const nbRows = xAxisIterations * yAxisIterations;

	if (nbRows <= 1) {
		return <div>Nothing to display!</div>;
	}

	const combinations = getCombinations(xAxisIterations, yAxisIterations);

	return (
		<>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			{combinations
				.filter(([x, y]) => y < x)
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
				.filter(([x, y]) => x > y)
				.map(([x, y]) => {
					const components = getComponents(y, x);
					const firstComponent = components[0];
					if (firstComponent.componentType !== 'Dropdown') {
						return (
							<div>
								First child component of a pairwise link must be a dropdown
							</div>
						);
					}
					return (
						<Fragment key={`${x}-${y}`}>
							<PairwiseMirror {...firstComponent} />
							<LunaticComponents
								components={components.slice(1)}
								componentProps={(props) => ({
									...props,
									id: `${props.id}-${x + 1}-${y + 1} `,
								})}
							/>
						</Fragment>
					);
				})}
		</>
	);
};

const PairwiseMirror = ({
	value,
	options,
	label,
}: LunaticComponentProps<'Dropdown'>) => {
	const selectedOption = options?.find((o) => o.value === value);
	if (!selectedOption) {
		return null;
	}
	return (
		<div className="lunatic lunatic-component lunatic-dropdown lunatic-combo-box-container default-style">
			<Label>{label}</Label>
			<div>{selectedOption?.label}</div>
		</div>
	);
};

const getCombinations = (
	sizeX: number,
	sizeY: number
): (readonly [number, number])[] => {
	return times(sizeY, (y) => times(sizeX, (x) => [x, y] as const)).flat(1);
};
