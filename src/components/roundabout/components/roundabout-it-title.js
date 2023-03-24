import React from 'react';
import { createCustomizableLunaticField } from '../../commons';

function RoundaboutItTitle({ label }) {
	return <div className="roundabout-it-title">{label}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutItTitle,
	'RoundaboutItTitle'
);
