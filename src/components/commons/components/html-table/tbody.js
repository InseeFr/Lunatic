import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Tbody({ id, className, children }) {
	return (
		<tbody
			id={`lunatic-table-tbody-${id}`}
			className={classnames('lunatic-table-tbody', className)}
		>
			{children}
		</tbody>
	);
}

Tbody.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

Tbody.defaultProps = {
	className: undefined,
};

export default createCustomizableLunaticField(Tbody, 'Tbody');
