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
	body,
	header,
	executeExpression,
	iteration,
}) {
	const [nbRows, setNbRows] = useState(undefined);
	const inputId = `lunatic-switch-${id}`;
	const labelId = `lunatic-switch-label-${id}`;

	useEffect(
		function () {
			if (Array.isArray(body)) {
				const { length } = body;
				setNbRows(length);
			}
		},
		[body]
	);

	return (
		<LunaticField
			label={label}
			contentId={inputId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-label-table"
		>
			<Table id={id} custom={custom} header={header}>
				<TableOrchestrator
					custom={custom}
					id={id}
					body={body}
					executeExpression={executeExpression}
					handleChange={handleChange}
					iteration={iteration}
					nbRows={nbRows}
					valueMap={value}
				/>
			</Table>
		</LunaticField>
	);
}

LunaticTable.propTypes = {
	id: PropTypes.string.isRequired,
	custom: PropTypes.object,
	value: PropTypes.object,
	body: PropTypes.arrayOf(PropTypes.array).isRequired,
	header: PropTypes.array,
};

LunaticTable.defaultProps = {
	lines: undefined,
	custom: undefined,
	value: {},
	header: [],
};

export default LunaticTable;
