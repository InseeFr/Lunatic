import React, { useState, useCallback } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import BlockForLoopOrchestrator from './block-for-loop-ochestrator';
import HandleRowButton from '../commons/handle-row-button';
import D from '../../../i18n';
import getInitLength from '../commons/get-init-length';

function BlockForLoop({
	declarations,
	id,
	label,
	lines,
	components,
	handleChange,
	valueMap,
	missing,
	shortcut,
	features,
	preferences,
	management,
	executeExpression,
	iterations,
	paginatedLoop,
	errors,
}) {
	const min = lines?.min;
	const max = lines?.max;

	const [nbRows, setNbRows] = useState(() => {
		if (iterations) {
			//This should be an Integer
			return Number.parseInt(iterations);
		}
		const initLength = getInitLength(valueMap);
		return Math.max(initLength, min);
	});

	const addRow = useCallback(
		function () {
			if (nbRows < max) {
				setNbRows(nbRows + 1);
			}
		},
		[max, nbRows]
	);

	const removeRow = useCallback(
		function () {
			if (nbRows > 1) {
				const newNbRows = nbRows - 1;
				setNbRows(newNbRows);
				Object.entries(valueMap).forEach(([k, v]) => {
					const newValue = v.reduce((acc, e, i) => {
						if (i < newNbRows) return [...acc, e];
						return acc;
					}, []);
					handleChange({ name: k }, newValue);
				});
			}
		},
		[nbRows, handleChange, valueMap]
	);

	const handleChangeLoop = useCallback(
		function (response, value, args) {
			if (!paginatedLoop) {
				const v = valueMap[response.name] ?? [];
				v[args.index] = value;
				handleChange(response, v, {
					loop: true,
					length: nbRows,
					shallowIteration: args.index,
				});
			} else
				handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[handleChange, nbRows, paginatedLoop, valueMap]
	);

	if (nbRows > 0) {
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} id={id} />
				<DeclarationsAfterText declarations={declarations} id={id} />
				<BlockForLoopOrchestrator
					components={components}
					handleChange={handleChangeLoop}
					nbRows={nbRows}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					executeExpression={executeExpression}
					errors={errors}
				/>
				<DeclarationsDetachable declarations={declarations} id={id} />
				{min && max && min !== max && (
					<>
						<HandleRowButton onClick={addRow} disabled={nbRows === max}>
							{label || D.DEFAULT_BUTTON_ADD}
						</HandleRowButton>
						<HandleRowButton onClick={removeRow} disabled={nbRows === 1}>
							{D.DEFAULT_BUTTON_REMOVE}
						</HandleRowButton>
					</>
				)}
			</>
		);
	}
	return null;
}

export default createCustomizableLunaticField(BlockForLoop, 'BlockForLoop');
