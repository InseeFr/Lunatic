import React from 'react';
import Declarations, {
	DECLARATION_POSITIONS,
	type	DeclarationsProps,
} from './declarations';

function DeclarationsDetachable(props: Omit<DeclarationsProps, 'type'>) {
	return <Declarations type={DECLARATION_POSITIONS.detachable} {...props} />;
}

export default DeclarationsDetachable;
