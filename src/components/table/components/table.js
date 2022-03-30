import React from 'react';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
} from '../../commons/components/html-table';
import Header from './header';

import './table.scss';

function Table({ custom, id, header, children }) {
	return (
		<HtmlTable id={id} custom={custom} className="lunatic-table">
			<Header id={id} header={header} custom={custom} />
			<HtmlTbody id={id} custom={custom}>
				{children}
			</HtmlTbody>
		</HtmlTable>
	);
}

export default Table;
