import { describe, expect, it } from 'vitest';
import { between, isNumberInInterval } from './number';

describe('between', () => {
	it('should work', () => {
		expect(between(0, -5, 100)).toBe(0);
		expect(between(1000, -5, 100)).toBe(100);
		expect(between(-23.22, -5, 100)).toBe(-5);
	});
});

describe('isNumberInInterval', () => {
	it('allows value within range', () => {
		expect(isNumberInInterval(25, 10, 50)).toBe(true);
	});
	it('disallows value above max', () => {
		expect(isNumberInInterval(55, 10, 50)).toBe(false);
	});
	it('disallows value below min', () => {
		expect(isNumberInInterval(5, 10, 50)).toBe(false);
	});
	it('allows negative within bounds', () => {
		expect(isNumberInInterval(-4, -5, 0)).toBe(true);
	});
	it('disallows negative if min is 0 or positive', () => {
		expect(isNumberInInterval(-1, 0, 10)).toBe(false);
		expect(isNumberInInterval(-1, 5, 10)).toBe(false);
	});
	it('allows only value above min when max is undefined', () => {
		expect(isNumberInInterval(999, 100)).toBe(true);
		expect(isNumberInInterval(50, 100)).toBe(false);
	});
	it('allows only value below max when min is undefined', () => {
		expect(isNumberInInterval(50, undefined, 100)).toBe(true);
		// accepts negative values
		expect(isNumberInInterval(-50, undefined, 100)).toBe(true);
		expect(isNumberInInterval(150, undefined, 100)).toBe(false);
	});
	it('allows decimal value within range', () => {
		expect(isNumberInInterval(9.99, 0, 10)).toBe(true);
	});
	it('disallows decimal value above max', () => {
		expect(isNumberInInterval(10.01, 0, 10)).toBe(false);
	});
	it('disallows decimal value below min', () => {
		expect(isNumberInInterval(-5.01, -5, 5)).toBe(false);
	});
	it('allows decimal value equal to max', () => {
		expect(isNumberInInterval(10.0, 0, 10)).toBe(true);
	});
	it('allows decimal value equal to min', () => {
		expect(isNumberInInterval(-5.0, -5, 5)).toBe(true);
	});
});
