import React from 'react';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
	Thead as HtmlThead,
	Tr as HtmlTr,
	Td as HtmlTd,
	Th as HtmlTh,
} from '../commons/components/html-table';

function Row({ id, custom, columns }) {
	return (
		<HtmlTr id={id} custom={custom}>
			{columns}
		</HtmlTr>
	);
}

export default Row;
