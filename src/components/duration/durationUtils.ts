export type DurationValue = {
	hours?: number | null;
	minutes?: number | null;
	years?: number | null;
	months?: number | null;
};

export type Formats = 'PTnHnM' | 'PnYnM';

export const propsByUnit = {
	hours: { min: '0', max: '23' },
	minutes: { min: '0', max: '59' },
	months: { min: '0', max: '11' },
	years: { min: '0' },
};

export const labelByUnit = {
	hours: 'Heures :',
	minutes: 'Minutes :',
	months: 'Mois : ',
	years: 'Années :',
};
