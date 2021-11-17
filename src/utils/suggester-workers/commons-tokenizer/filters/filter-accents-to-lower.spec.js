import filterATL from './filter-accents-to-lower';

describe('filter-length', function () {
	it('maj accent', function () {
		const tokens = ['UN', 'éà ù'];
		const results = filterATL(tokens, { min: 3 });
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(2);
		expect(results[0]).toBe('un');
		expect(results[1]).toBe('ea u');
	});
});
