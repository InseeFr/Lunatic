import React from 'react';
import Declarations, { DECLARATION_POSITIONS } from './declarations';

function DeclarationsBeforeText(props) {
	return <Declarations type={DECLARATION_POSITIONS.before} {...props} />;
}

export default DeclarationsBeforeText;
