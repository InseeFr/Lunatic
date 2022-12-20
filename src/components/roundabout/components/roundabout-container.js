import React from 'react';
import { createCustomizableLunaticField } from '../../commons';

function RoundaboutContainer({ children }) {
	return <div className="lunatic-roundabout">{children}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutContainer,
	'RoundaboutContainer'
);
