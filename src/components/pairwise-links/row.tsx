import React, { useCallback } from 'react';
import { OrchestratedComponent } from '../commons';
import { LunaticComponentProps } from '../type';

type Props = {
	linksIterations: [number, number];
	lengths: number[];
} & Omit<
	LunaticComponentProps<'PairwiseLinks'>,
	'declarations' | 'xAxisIterations' | 'yAxisIterations'
>;

const empty = {};

function Row({
	components,
	value: valueMap = empty,
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	executeExpression,
	linksIterations,
	symLinks,
	lengths,
}: Props) {
	const [x, y] = linksIterations;
	const handleChangeRow = useCallback(
		function (response: { name: string }, value: unknown) {
			handleChange(response, value, { linksIterations, symLinks, lengths });
		},
		[handleChange, linksIterations, symLinks, lengths]
	);

	if (x === y) {
		return null;
	}

	return (
		<>
			{components.map(function (component) {
				const idComponent = `${component.id}-${x + 1}-${y + 1} `;

				let value = undefined;

				if ('response' in component) {
					// @ts-ignore
					const { name } = component.response;
					const valueArray = valueMap[name];
					if (Array.isArray(valueArray) && Array.isArray(valueArray[x])) {
						value = (valueArray[x] as unknown[])[y] || '';
					}
				}

				return (
					<OrchestratedComponent
						component={component}
						key={idComponent}
						handleChange={handleChangeRow}
						features={features}
						missing={missing}
						shortcut={shortcut}
						management={management}
						value={value}
						id={idComponent}
						preferences={preferences}
						linksIterations={linksIterations}
						executeExpression={executeExpression}
					/>
				);
			})}
		</>
	);
}

export default Row;
