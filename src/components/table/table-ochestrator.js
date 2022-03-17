import React from 'react';
import { useOnHandleChange } from '../commons';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
	Thead as HtmlThead,
	Tr as HtmlTr,
	Td as HtmlTd,
	Th as HtmlTh,
} from '../commons/components/html-table';

function TableOchestrator({ value, lines, cells, custom, id }) {
	// const handleChange = useOnHandleChange({ handleChange, response, value });
	return (
		<HtmlTable id={id} custom={custom}>
			<HtmlThead id={id} custom={custom}>
				<HtmlTr id={id} custom={custom}>
					<HtmlTh id={id} custom={custom}>
						Un tableau
					</HtmlTh>
				</HtmlTr>
			</HtmlThead>
			<HtmlTbody id={id} custom={custom}></HtmlTbody>
		</HtmlTable>
	);
}

export default TableOchestrator;
