import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Th({ id, index, children, className, colSpan, rowSpan }) {
	return (
		<th
			id={`lunatic-table-th-${id}-${index}`}
			className={classnames('lunatic-table-th', className)}
			colSpan={colSpan}
			rowSpan={rowSpan}
		>
			{children}
		</th>
	);
}

Th.propTypes = {
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	className: PropTypes.string,
	rowSpan: PropTypes.number,
	colSpan: PropTypes.number,
};

Th.defaultProps = {
	className: undefined,
	rowSpan: undefined,
	colSpan: undefined,
};

export default createCustomizableLunaticField(Th);
