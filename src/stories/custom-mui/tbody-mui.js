import React from 'react';
import classnames from 'classnames';
import TableBody from '@mui/material/TableBody';

function TbodyMui({ children, id, className }) {
	return (
		<TableBody
			id={`lunatic-mui-tbody-${id}`}
			className={classnames('lunatic-mui-tbody', className)}
		>
			{children}
		</TableBody>
	);
}

export default TbodyMui;
