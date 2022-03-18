import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Th({ id, index, children, className }) {
	return (
		<th
			id={`lunatic-table-th-${id}-${index}`}
			className={classnames('lunatic-table-th', className)}
		>
			{children}
		</th>
	);
}

Th.propTypes = {
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	className: PropTypes.string,
};

Th.defaultProps = {
	className: undefined,
};

export default createCustomizableLunaticField(Th);
