import React from 'react';
import classnames from 'classnames';
import TableCell from '@mui/material/TableCell';

function ThMui({ id, index, children, className }) {
	return (
		<TableCell
			id={`lunatic-mui-th-${id}-${index}`}
			className={classnames('lunatic-mui-th', className)}
		>
			{children}
		</TableCell>
	);
}

export default ThMui;
