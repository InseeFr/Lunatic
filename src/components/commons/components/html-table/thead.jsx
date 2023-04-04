import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createCustomizableLunaticField from '../../create-customizable-field';

function Thead({ id, children, className }) {
	return (
		<thead
			id={`lunatic-table-thead-${id}`}
			className={classnames('lunatic-table-thead', className)}
		>
			{children}
		</thead>
	);
}

Thead.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

Thead.defaultProps = {
	className: undefined,
};

export default createCustomizableLunaticField(Thead, 'Thead');
