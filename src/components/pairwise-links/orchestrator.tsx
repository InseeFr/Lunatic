import { useState, useEffect } from 'react';
import type { LunaticComponentProps } from '../type';
import Row from './row';

type Props = {
	nbRows: number;
} & Omit<LunaticComponentProps<'PairwiseLinks'>, 'declarations'>;

function LinksOrchestrator(props: Props) {
	const {
		id,
		components,
		nbRows,
		value: valueMap,
		handleChange,
		features,
		missing,
		className,
		shortcut,
		preferences,
		executeExpression,
		iteration,
		xAxisIterations,
		yAxisIterations,
		errors,
		symLinks,
	} = props;

	const [lengths, setLenghts] = useState([xAxisIterations, yAxisIterations]);

	useEffect(
		function () {
			setLenghts([xAxisIterations, yAxisIterations]);
		},
		[xAxisIterations, yAxisIterations]
	);

	if (nbRows <= 0) {
		return null;
	}

	const items = new Array(nbRows).fill(null);

	return (
		<>
			{items.map(function (_, index) {
				const i = Math.trunc(index / xAxisIterations);
				const j = index % xAxisIterations;
				return (
					<Row
						key={index}
						id={id}
						components={components}
						value={valueMap}
						handleChange={handleChange}
						executeExpression={executeExpression}
						iteration={iteration}
						linksIterations={[i, j]}
						lengths={lengths}
						/** */
						features={features}
						shortcut={shortcut}
						className={className}
						preferences={preferences}
						missing={missing}
						errors={errors}
						symLinks={symLinks}
					/>
				);
			})}
		</>
	);
}

export default LinksOrchestrator;
