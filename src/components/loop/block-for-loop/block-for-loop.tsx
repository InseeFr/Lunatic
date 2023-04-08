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
import { LunaticComponentProps } from '../../type';

function BlockForLoop({
	declarations,
	id,
	label,
	lines,
	components,
	handleChange,
	value: valueMap,
	missing,
	shortcut,
	features,
	preferences,
	management,
	executeExpression,
	iterations,
	paginatedLoop,
	errors,
}: LunaticComponentProps<'Loop'>) {
	const min = lines?.min;
	const max = lines?.max;

	const [nbRows, setNbRows] = useState(() => {
		if (iterations) {
			//This should be an Integer
			return Number.parseInt(iterations.toString());
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
					const newValue = v.filter((_, i) => i < newNbRows);
					handleChange({ name: k }, newValue);
				});
			}
		},
		[nbRows, handleChange, valueMap]
	);

	const handleChangeLoop = useCallback(
		function (
			response: { name: string },
			value: unknown,
			args: { index: number; [k: string]: unknown }
		) {
			if (!paginatedLoop) {
				const v = valueMap[response.name];
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

	if (nbRows <= 0) {
		return null;
	}
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<DeclarationsAfterText declarations={declarations} id={id} />
			<BlockForLoopOrchestrator
				id={id}
				components={components}
				handleChange={handleChangeLoop}
				nbRows={nbRows}
				valueMap={valueMap}
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

export default createCustomizableLunaticField(BlockForLoop, 'BlockForLoop');
