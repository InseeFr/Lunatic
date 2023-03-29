import React from 'react';
import { createCustomizableLunaticField } from '../../commons';

function RoundaboutLabel({ value }) {
	return <div className="roundabout-label">{value}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutLabel,
	'RoundaboutLabel'
);
