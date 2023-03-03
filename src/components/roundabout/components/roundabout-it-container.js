import React from 'react';
import { createCustomizableLunaticField } from '../../commons';

function RoundaboutItContainer({ children }) {
	return <div className="roundabout-iteration-title">{children}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutItContainer,
	'RoundaboutItContainer'
);
