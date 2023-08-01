import { describe, it, expect } from 'vitest';
import { formatDuration } from './formatDuration';
describe('formatDuration', () => {
	it('should format time correctly', () => {
		expect(formatDuration({ hours: 12, minutes: 15 })).toEqual('PT12H15M');
		expect(formatDuration({ hours: 14, minutes: 50 })).toEqual('PT14H50M');
		expect(formatDuration({ hours: null, minutes: null })).toEqual(null);
	});
	it('should format date correctly', () => {
		expect(formatDuration({ years: 12, months: 15 })).toEqual('P12Y15M');
		expect(formatDuration({ years: 14, months: 50 })).toEqual('P14Y50M');
		expect(formatDuration({ years: 14, months: null })).toEqual('P14Y0M');
		expect(formatDuration({ years: null, months: null })).toEqual(null);
	});
});
