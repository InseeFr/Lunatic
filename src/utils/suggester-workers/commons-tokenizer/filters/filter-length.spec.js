import filterLength from './filter-length';

describe('filter-length', function () {
	it('empty', function () {
		const tokens = ['un', 'no'];
		const results = filterLength(tokens, { min: 3 });
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(0);
	});

	it('remove one', function () {
		const tokens = ['un', 'long'];
		const results = filterLength(tokens, { min: 3 });
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(1);
		expect(results[0]).toBe('long');
	});
});
