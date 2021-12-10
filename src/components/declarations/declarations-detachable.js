import React from 'react';
import Declarations, { DECLARATION_POSITIONS } from './declarations';

function DeclarationsDetachable(props) {
	return <Declarations type={DECLARATION_POSITIONS.detachable} {...props} />;
}

export default DeclarationsDetachable;
