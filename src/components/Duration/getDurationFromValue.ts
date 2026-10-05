import { DurationFormat } from '../type';
import { type DurationValue } from './durationUtils';

const isNullOrUndefined = (value: any): value is null | undefined =>
	value === null || value === undefined;

/**
 * Convert a string into a duration
 *
 * ## Example
 * - "P12Y5M" => {years: 12, months: 5}
 */
export const getDurationFromValue = (
	value: string | null | undefined,
	format: DurationFormat
): DurationValue => {
	// Handle nulls or undefined value
	if (isNullOrUndefined(value)) {
		if (format === 'PTnHnM') {
			return { hours: null, minutes: null };
		}
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
