import filterStemmer from './filter-stemmer';

describe('filter-stemmer', function () {
	it('commerce', function () {
		const tokens = ['commerce', 'commercial'];
		const results = filterStemmer(tokens, { language: 'French' });
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(2);
		expect(results[0]).toBe('commerc');
		expect(results[1]).toBe('commercial');
	});
});
