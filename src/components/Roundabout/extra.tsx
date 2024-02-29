import { slottableComponent } from '../shared/HOC/slottableComponent';
import React, { type PropsWithChildren, type ReactNode } from 'react';

export const RoundaboutContainer = slottableComponent<PropsWithChildren>(
	'RoundaboutContainer',
	({ children }) => <div className="lunatic-roundabout">{children}</div>
);

export const RoundaboutLabel = slottableComponent(
	'RoundaboutLabel',
	({ value }: { value?: ReactNode }) => (
		<div className="roundabout-label">{value}</div>
	)
);

export const RoundaboutItTitle = slottableComponent<{ label?: ReactNode }>(
	'RoundaboutItTitle',
	({ label }) => <div className="roundabout-it-title">{label}</div>
);

export const RoundaboutItContainer = slottableComponent<PropsWithChildren>(
	'RoundaboutItContainer',
	({ children }) => <div className="roundabout-iteration-title">{children}</div>
);

export const RoundaboutPending = slottableComponent('RoundaboutPending', () => (
	<div className="roundabout-pending">Pending...</div>
));
