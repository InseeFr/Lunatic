import React, { ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';

function RoundaboutLabel({ value }: { value?: ReactNode }) {
	return <div className="roundabout-label">{value}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutLabel,
	'RoundaboutLabel'
);
