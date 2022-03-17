import React from 'react';
import TableMUI from '@mui/material/Table';
import TableBodyMUI from '@mui/material/TableBody';
import TableCellMUI from '@mui/material/TableCell';
import TableHeadMUI from '@mui/material/TableHead';
import TableRowMUI from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

function Table({ children }) {
	return (
		<TableContainer component={Paper}>
			<TableMUI>{children}</TableMUI>
		</TableContainer>
	);
}

const HtmlTableMUI = {
	Table: Table,
	Tbody: TableBodyMUI,
	Thead: TableHeadMUI,
	Tr: TableRowMUI,
	Th: TableCellMUI,
	Td: TableCellMUI,
};

export default HtmlTableMUI;
