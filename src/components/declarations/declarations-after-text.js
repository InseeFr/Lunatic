import React from 'react';
import Declarations, { DECLARATION_POSITIONS } from './declarations';

function DeclarationsAfterText(props) {
	return <Declarations type={DECLARATION_POSITIONS.after} {...props} />;
}

export default DeclarationsAfterText;
