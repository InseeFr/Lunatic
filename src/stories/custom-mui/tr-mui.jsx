import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';

function TrMui({ id, children, className, row }) {
	return (
		<TableRow
			id={`lunatic-mui-tr-${id}-${row}`}
			className={classnames('lunatic-mui-tr', className)}
		>
			{children}
		</TableRow>
	);
}

TrMui.propTypes = {
	id: PropTypes.string.isRequired,
	row: PropTypes.number.isRequired,
	className: PropTypes.string,
};

TrMui.defaultProps = {
	className: undefined,
};

export default TrMui;
