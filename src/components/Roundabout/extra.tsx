import { customizedComponent } from '../shared/HOC/customizedComponent';
import React, { type PropsWithChildren, type ReactNode } from 'react';

export const RoundaboutContainer = customizedComponent<PropsWithChildren>(
	'RoundaboutContainer',
	({ children }) => <div className="lunatic-roundabout">{children}</div>
);

export const RoundaboutLabel = customizedComponent(
	'RoundaboutLabel',
	({ value }: { value?: ReactNode }) => (
		<div className="roundabout-label">{value}</div>
	)
);

export const RoundaboutItTitle = customizedComponent<{ label?: ReactNode }>(
	'RoundaboutItTitle',
	({ label }) => <div className="roundabout-it-title">{label}</div>
);

export const RoundaboutItContainer = customizedComponent<PropsWithChildren>(
	'RoundaboutItContainer',
	({ children }) => <div className="roundabout-iteration-title">{children}</div>
);

export const RoundaboutPending = customizedComponent(
	'RoundaboutPending',
	() => <div className="roundabout-pending">Pending...</div>
);
