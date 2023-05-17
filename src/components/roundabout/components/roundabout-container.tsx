import React, { PropsWithChildren } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import './roundabout.scss';

function RoundaboutContainer({ children }: PropsWithChildren<{}>) {
	return <div className="lunatic-roundabout">{children}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutContainer,
	'RoundaboutContainer'
);
