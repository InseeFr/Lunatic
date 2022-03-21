import React from 'react';
import PropTypes from 'prop-types';
import { linesPropTypes } from '../commons/prop-types';
import { LunaticField } from '../commons';
import Table from './table';

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
	const inputId = `lunatic-switch-${id}`;
	const labelId = `lunatic-switch-label-${id}`;

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
			/>
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
