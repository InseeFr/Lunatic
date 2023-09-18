import React, { type PropsWithChildren } from 'react';

import { createCustomizableLunaticField } from '../../commons';

function RoundaboutItContainer({ children }: PropsWithChildren<{}>) {
	return <div className="roundabout-iteration-title">{children}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutItContainer,
	'RoundaboutItContainer'
);
