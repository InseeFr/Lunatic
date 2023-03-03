import { describe, it, expect } from 'vitest';
import filterToLower from './filter-to-lower';

describe('filter-to-lower', function () {
	it('UN', function () {
		const tokens = ['UN', 'no'];
		const results = filterToLower(tokens);
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(2);
		expect(results[0]).toBe('un');
		expect(results[1]).toBe('no');
	});
});
