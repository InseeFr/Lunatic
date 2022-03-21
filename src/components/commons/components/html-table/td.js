import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Td({ id, children, row, index, className, colSpan, rowSpan }) {
	return (
		<td
			id={`lunatic-table-td-${id}-${row}-${index}`}
			className={classnames('lunatic-table-td', className)}
			colSpan={colSpan}
			rowSpan={rowSpan}
		>
			{children}
		</td>
	);
}

Td.propTypes = {
	id: PropTypes.string.isRequired,
	row: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	className: PropTypes.string,
	rowSpan: PropTypes.number,
	colSpan: PropTypes.number,
};
Td.defaultProps = {
	className: undefined,
	rowSpan: undefined,
	colSpan: undefined,
};

export default createCustomizableLunaticField(Td);
