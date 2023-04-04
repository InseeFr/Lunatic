import React from 'react';
import Table from '@mui/material/Table';
import classnames from 'classnames';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

function TableMui({ children, id, className }) {
	return (
		<TableContainer component={Paper}>
			<Table
				id={`lunatic-mui-table${id}`}
				className={classnames('lunatic-mui-table', className)}
			>
				{children}
			</Table>
		</TableContainer>
	);
}

export default TableMui;
