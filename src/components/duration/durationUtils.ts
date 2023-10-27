export type DurationValue = {
	hours?: number | null;
	minutes?: number | null;
	years?: number | null;
	months?: number | null;
};

export type Formats = 'PTnHnM' | 'PnYnM';

export const propsByUnit = {
	hours: { min: 0, max: 23, size: 2, style: { width: '2em' } },
	minutes: { min: 0, max: 59, size: 2, style: { width: '2em' } },
	months: { min: 0, max: 11, size: 2, style: { width: '2em' } },
	years: { min: 0, size: 4, style: { width: '4em' } },
};

export const labelByUnit = {
	hours: 'Heures :',
	minutes: 'Minutes :',
	months: 'Mois : ',
	years: 'Années :',
};

export function clampDuration(
	value: number | null,
	unit: keyof typeof propsByUnit
) {
	if (value === null) {
		return value;
	}
	const props = propsByUnit[unit];
	if (value < props.min) {
		return props.min;
	}
	if ('max' in props && value > props.max) {
		return props.max;
	}
	return value;
}
