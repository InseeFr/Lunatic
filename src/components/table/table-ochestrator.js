import React from 'react';
import { useOnHandleChange, NothingToDisplay } from '../commons';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
	Thead as HtmlThead,
	Tr as HtmlTr,
	Td as HtmlTd,
	Th as HtmlTh,
} from '../commons/components/html-table';
import Header from './header';

function TableOchestrator({ value, lines, cells, custom, id }) {
	// const handleChange = useOnHandleChange({ handleChange, response, value });

	return (
		<HtmlTable id={id} custom={custom}>
			<Header id={id} custom={custom} cells={cells} />
			<HtmlTbody id={id} custom={custom}></HtmlTbody>
		</HtmlTable>
	);
}

export default TableOchestrator;
