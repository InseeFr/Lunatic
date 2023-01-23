import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from './components/table';
import { createLunaticComponent, Errors } from '../commons';
import TableOrchestrator from './table-orchestrator';

function LunaticTable({
	id,
	handleChange,
	value,
	body,
	header,
	executeExpression,
	iteration,
	errors,
}) {
	const [nbRows, setNbRows] = useState(undefined);

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
		<>
			<Table id={id} header={header}>
				<TableOrchestrator
					id={id}
					body={body}
					executeExpression={executeExpression}
					handleChange={handleChange}
					iteration={iteration}
					nbRows={nbRows}
					valueMap={value}
					//TODO propagate
					errors={errors}
				/>
			</Table>
			<Errors errors={errors} activeId={id} />
		</>
	);
}

LunaticTable.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.object,
	body: PropTypes.arrayOf(PropTypes.array).isRequired,
	header: PropTypes.array,
};

LunaticTable.defaultProps = {
	lines: undefined,
	value: {},
	header: [],
};

export default createLunaticComponent(LunaticTable);
