import React, { useState, useEffect } from 'react';
import Row from './row';

function LinksOrchestrator(props) {
	const {
		id,
		components,
		nbRows,
		valueMap,
		handleChange,
		features,
		missing,
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

	if (nbRows > 0) {
		return new Array(nbRows).fill(null).map(function (_, index) {
			const i = Math.trunc(index / xAxisIterations);
			const j = index % xAxisIterations;
			return (
				<Row
					key={index}
					id={id}
					rowIndex={index}
					components={components}
					valueMap={valueMap}
					handleChange={handleChange}
					executeExpression={executeExpression}
					iteration={iteration}
					linksIterations={[i, j]}
					lengths={lengths}
					/** */
					features={features}
					shortcut={shortcut}
					preferences={preferences}
					missing={missing}
					errors={errors}
					symLinks={symLinks}
				/>
			);
		});
	}
	return null;
}

export default LinksOrchestrator;
