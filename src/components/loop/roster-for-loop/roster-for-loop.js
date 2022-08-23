import React, { useEffect, useState, useCallback } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import RosterTable from './roster-table';
import { Errors } from '../../commons';
import HandleRowButton from './handle-row-button';
import D from '../../../i18n';

const DEFAULT_MAX_ROWS = 12;

function getTableLength(value) {
	return Object.values(value).reduce(function (length, variable) {
		if (Array.isArray(variable)) {
			return Math.max(length, variable.length);
		}
		return length;
	}, 1);
}

function RosterforLoop({
	valueMap,
	lines,
	handleChange,
	declarations,
	label,
	components,
	executeExpression,
	headers,
	missing,
	shortcut,
	id,
	management,
	custom,
	errors,
}) {
	const max = lines?.max || DEFAULT_MAX_ROWS;
	const [init, setInit] = useState(false);
	const [nbRows, setNbRows] = useState(-1);

	useEffect(
		function () {
			if (!init && valueMap) {
				setNbRows(getTableLength(valueMap));
				setInit(true);
			}
		},
		[init, valueMap]
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
				<RosterTable
					id={id}
					components={components}
					nbRows={nbRows}
					executeExpression={executeExpression}
					header={headers}
					handleChange={handleChange}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
					custom={custom}
				/>
				<DeclarationsDetachable
					declarations={declarations}
					id={id}
					custom={custom}
				/>
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
				<Errors errors={errors} />
			</>
		);
	}
	return null;
}

export default RosterforLoop;
