import React from 'react';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
	Thead as HtmlThead,
	Tr as HtmlTr,
	Td as HtmlTd,
	Th as HtmlTh,
} from '../commons/components/html-table';
import { createCustomizableLunaticField } from '../commons';

function Header({ cells }) {
	return <></>;
}

export default createCustomizableLunaticField(Header);
