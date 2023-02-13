import { describe, it, expect } from 'vitest';
import filterDouble from './filter-double';

describe('filter-double', function () {
	it('empty', function () {
		const tokens = ['un', 'un'];
		const results = filterDouble(tokens);
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(1);
		expect(results[0]).toBe('un');
	});

	it('remove one', function () {
		const tokens = ['un', 'un', 'long'];
		const results = filterDouble(tokens, { min: 3 });
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(2);
		expect(results[0]).toBe('un');
		expect(results[1]).toBe('long');
	});
});
