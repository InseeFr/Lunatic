import { type ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';

function RoundaboutItTitle({ label }: { label?: ReactNode }) {
	return <div className="roundabout-it-title">{label}</div>;
}

export default createCustomizableLunaticField(
	RoundaboutItTitle,
	'RoundaboutItTitle'
);
