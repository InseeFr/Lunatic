import React from 'react';
import Declarations, {
	DECLARATION_POSITIONS,
	type DeclarationsProps,
} from './declarations';
import { createCustomizableLunaticField } from '../commons';

function DeclarationsBeforeText(props: Omit<DeclarationsProps, 'type'>) {
	return <Declarations type={DECLARATION_POSITIONS.before} {...props} />;
}

export default createCustomizableLunaticField(
	DeclarationsBeforeText,
	' DeclarationsBeforeText'
);
