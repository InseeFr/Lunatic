import { DurationValue } from './durationUtils';

export const formatDuration = (duration: DurationValue): string | null => {
	const prefix = 'hours' in duration && 'minutes' in duration ? 'PT' : 'P';
	// The duration has no numeric value (all nulls), then return null
	if (Object.values(duration).filter((v) => v !== null).length === 0) {
		return null;
	}

	// Recreate unit so we can control the unit order for formatting
	const units = ['years', 'months', 'hours', 'minutes'] as const;
	let durationParts = '';
	for (const unit of units) {
		if (unit in duration) {
			durationParts += (duration[unit] ?? 0) + unit[0].toUpperCase();
		}
	}
	return prefix + durationParts;
};
