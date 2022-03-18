import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Tr({ id, children, className, row }) {
	return (
		<tr
			id={`lunatic-table-tr-${id}-${row}`}
			className={classnames('lunatic-table-tr', className)}
		>
			{children}
		</tr>
	);
}

Tr.propTypes = {
	id: PropTypes.string.isRequired,
	row: PropTypes.number.isRequired,
	className: PropTypes.string,
};

Tr.defaultProps = {
	className: undefined,
};

export default createCustomizableLunaticField(Tr);
