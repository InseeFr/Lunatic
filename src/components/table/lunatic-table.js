import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { linesPropTypes } from '../commons/prop-types';
import { LunaticField } from '../commons';
import Table from './components/table';
import TableOrchestrator from './table-orchestrator';

function LunaticTable({
	label,
	declarations,
	id,
	handleChange,
	value,
	custom,
	cells,
	executeExpression,
	iteration,
}) {
	const [nbRows, setNbRows] = useState(undefined);
	const inputId = `lunatic-switch-${id}`;
	const labelId = `lunatic-switch-label-${id}`;

	useEffect(
		function () {
			if (Array.isArray(cells)) {
				const { length } = cells;
				setNbRows(length);
			}
		},
		[cells]
	);

	return (
		<LunaticField
			label={label}
			contentId={inputId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-switch"
		>
			<Table
				id={id}
				custom={custom}
				value={value}
				handleChange={handleChange}
				cells={cells}
				executeExpression={executeExpression}
				iteration={iteration}
			>
				<TableOrchestrator
					custom={custom}
					id={id}
					cells={cells}
					executeExpression={executeExpression}
					handleChange={handleChange}
					iteration={iteration}
					components={cells}
					nbRows={nbRows}
					valueMap={value}
				/>
			</Table>
		</LunaticField>
	);
}

LunaticTable.propTypes = {
	id: PropTypes.string.isRequired,
	lines: linesPropTypes,
	custom: PropTypes.object,
	value: PropTypes.object,
};

LunaticTable.defaultProps = {
	lines: undefined,
	custom: undefined,
	value: {},
	cells: PropTypes.array,
};

export default LunaticTable;
