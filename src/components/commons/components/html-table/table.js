import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Table({ className, id, children }) {
	return (
		<table
			id={`table-${id}`}
			className={classnames('lunatic-table', className)}
		>
			{children}
		</table>
	);
}

Table.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

Table.defaultProps = {
	className: undefined,
};

export default createCustomizableLunaticField(Table);
