import React from 'react';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
} from '../../commons/components/html-table';
import Header from './header';

import './table.scss';

function Table({ id, header, children }) {
	return (
		<HtmlTable id={id} className="lunatic-table">
			<Header id={id} header={header} />
			<HtmlTbody id={id}>{children}</HtmlTbody>
		</HtmlTable>
	);
}

export default Table;
