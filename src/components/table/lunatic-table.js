import React from 'react';
import PropTypes from 'prop-types';
import { linesPropTypes } from '../commons/prop-types';
import { LunaticField, useOnHandleChange } from '../commons';
import TableOchestrator from './table-ochestrator';

function LunaticTable({
	label,
	declarations,
	id,
	handleChange,
	response,
	value,
	custom,
	cells,
	lines,
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
			<TableOchestrator
				id={id}
				custom={custom}
				value={value}
				handleChange={handleChange}
				cells={cells}
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
