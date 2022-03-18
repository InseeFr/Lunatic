import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Td({ id, children, row, index, className }) {
	return (
		<td
			id={`lunatic-table-td-${id}-${row}-${index}`}
			className={classnames('lunatic-table-td', className)}
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
};
Td.defaultProps = {
	className: undefined,
};

export default createCustomizableLunaticField(Td);
