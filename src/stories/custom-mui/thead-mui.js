import React from 'react';
import classnames from 'classnames';
import TableHead from '@mui/material/TableHead';

function TheadMui({ children, id, className }) {
	return (
		<TableHead
			id={`lunatic-mui-thead-${id}`}
			className={classnames('lunatic-mui-thead', className)}
		>
			{children}
		</TableHead>
	);
}

export default TheadMui;
