import React, { useState, useCallback, useEffect } from 'react';
import { Errors } from '../../commons';
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
	custom,
	paginatedLoop,
	errors,
}) {
	const [nbRows, setNbRows] = useState(getInitLength(valueMap));
	const [min, setMin] = useState(undefined);
	const [max, setMax] = useState(undefined);

	useEffect(
		function () {
			if (lines) {
				const { min, max } = lines;
				if (min !== undefined && max !== undefined) {
					setMin(min);
					setMax(max);
				}
			}
		},
		[lines]
	);

	useEffect(
		function () {
			if (Number.parseInt(iterations)) {
				setNbRows(iterations);
			} else if (min && max) {
				setNbRows(min);
			}
		},
		[min, max, iterations]
	);

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
				const v = valueMap[response.name];
				v[args.index] = value;
				handleChange(response, v, { loop: true, length: nbRows });
			} else
				handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[handleChange, nbRows, paginatedLoop, valueMap]
	);

	if (nbRows > 0) {
		return (
			<>
				<DeclarationsBeforeText
					declarations={declarations}
					id={id}
					custom={custom}
				/>
				<DeclarationsAfterText
					declarations={declarations}
					id={id}
					custom={custom}
				/>
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
					custom={custom}
				/>
				<DeclarationsDetachable
					declarations={declarations}
					id={id}
					custom={custom}
				/>
				{min && max && min !== max && (
					<>
						<HandleRowButton
							onClick={addRow}
							disabled={nbRows === max}
							custom={custom}
						>
							{label || D.DEFAULT_BUTTON_ADD}
						</HandleRowButton>
						<HandleRowButton
							onClick={removeRow}
							disabled={nbRows === 1}
							custom={custom}
						>
							{D.DEFAULT_BUTTON_REMOVE}
						</HandleRowButton>
					</>
				)}
				<Errors errors={errors} />
			</>
		);
	}
	return null;
}

export default BlockForLoop;

// handleChange={handleChange}
// preferences={preferences}
// savingType={savingType}
// management={management}
// features={features}
// bindings={bindings}
// missing={missing}
// shortcut={shortcut}
