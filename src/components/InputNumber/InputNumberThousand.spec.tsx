import { describe, expect, it } from 'vitest';
import { isNumberValueAllowed } from './InputNumberThousand';

describe('isNumberValueAllowed', () => {
	it('allows value within range', () => {
		expect(isNumberValueAllowed(25, 10, 50)).toBe(true);
	});
	it('disallows value above max', () => {
		expect(isNumberValueAllowed(55, 10, 50)).toBe(false);
	});
	it('disallows value below min', () => {
		expect(isNumberValueAllowed(5, 10, 50)).toBe(false);
	});
	it('allows negative within bounds', () => {
		expect(isNumberValueAllowed(-4, -5, 0)).toBe(true);
	});
	it('disallows negative if min is 0 or positive', () => {
		expect(isNumberValueAllowed(-1, 0, 10)).toBe(false);
		expect(isNumberValueAllowed(-1, 5, 10)).toBe(false);
	});
	it('allows undefined floatValue', () => {
		expect(isNumberValueAllowed(undefined, 0, 10)).toBe(true);
	});
	it('allows only value above min when max is undefined', () => {
		expect(isNumberValueAllowed(999, 100)).toBe(true);
		expect(isNumberValueAllowed(50, 100)).toBe(false);
	});
	it('allows only value below max when min is undefined', () => {
		expect(isNumberValueAllowed(50, undefined, 100)).toBe(true);
		// accepts negative values
		expect(isNumberValueAllowed(-50, undefined, 100)).toBe(true);
		expect(isNumberValueAllowed(150, undefined, 100)).toBe(false);
	});
	it('allows decimal value within range', () => {
		expect(isNumberValueAllowed(9.99, 0, 10)).toBe(true);
	});
	it('disallows decimal value above max', () => {
		expect(isNumberValueAllowed(10.01, 0, 10)).toBe(false);
	});
	it('disallows decimal value below min', () => {
		expect(isNumberValueAllowed(-5.01, -5, 5)).toBe(false);
	});
	it('allows decimal value equal to max', () => {
		expect(isNumberValueAllowed(10.0, 0, 10)).toBe(true);
	});
	it('allows decimal value equal to min', () => {
		expect(isNumberValueAllowed(-5.0, -5, 5)).toBe(true);
	});
});
