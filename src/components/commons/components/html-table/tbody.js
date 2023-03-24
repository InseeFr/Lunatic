import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Tbody({ id, className, children }) {
	return (
		<tbody
			id={id ? `lunatic-table-tbody-${id}` : undefined}
			className={classnames('lunatic-table-tbody', className)}
		>
			{children}
		</tbody>
	);
}

Tbody.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
};

Tbody.defaultProps = {
	className: undefined,
	id: undefined,
};

export default createCustomizableLunaticField(Tbody, 'Tbody');
