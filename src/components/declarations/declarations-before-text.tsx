import React from 'react';
import Declarations, { DECLARATION_POSITIONS } from './declarations';
import { DeclarationsProps } from './declarations';

function DeclarationsBeforeText(props: Omit<DeclarationsProps, 'type'>) {
	return <Declarations type={DECLARATION_POSITIONS.before} {...props} />;
}

export default DeclarationsBeforeText;
