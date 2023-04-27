import React from 'react';
import { createCustomizableLunaticField } from '../../commons';

function RoundaboutPending() {
	return <div className="roundabout-pending">Pending...</div>;
}

export default createCustomizableLunaticField(
	RoundaboutPending,
	'RoundaboutPending'
);
