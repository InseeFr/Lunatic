import { DurationFormat } from '../type';
import { type DurationValue } from './durationUtils';

/**
 * Convert a string into a duration
 *
 * ## Example
 * - "P12Y5M" => {year: 12, month: 5}
 */
export const getDurationFromValue = (
	value: string | null,
	format: DurationFormat
): DurationValue => {
	// Handle nulls value
	if (value === null && format === 'PTnHnM') {
		return { hours: null, minutes: null };
	} else if (value === null) {
		return { years: null, months: null };
	}

	const match = matchFromFormat(value, format);
	if (format === 'PTnHnM') {
		return { hours: match[0], minutes: match[1] };
	}
	return { years: match[0], months: match[1] };
};

/**
 * Generate a regexp from the format to extract the numbers from the string
 *
 * ## Example :
 * - "P12Y3M" => [12, 3]
 */
const matchFromFormat = (value: string, format: DurationFormat): number[] => {
	const regex = new RegExp(format.replaceAll('n', String.raw`(\d+)`));
	const match = regex.exec(value);
	if (!match) {
		throw new Error(
			`Invalid duration value "${value}" does not match the format "${format}"`
		);
	}
	const [, ...matches] = match;
	return matches.map((v) => Number.parseInt(v, 10));
};
