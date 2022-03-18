import React from 'react';
import classnames from 'classnames';
import TableCell from '@mui/material/TableCell';

function TdMui({ id, children, row, index, className }) {
	return (
		<TableCell
			id={`lunatic-mui-td-${id}-${row}-${index}`}
			className={classnames('lunatic-mui-td', className)}
		>
			{children}
		</TableCell>
	);
}

export default TdMui;
