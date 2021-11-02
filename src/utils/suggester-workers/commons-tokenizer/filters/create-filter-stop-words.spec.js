import createFilterSW from './create-filter-stop-words';

describe('create-filter-stop-words', function () {
	it('only last ', function () {
		const sw = ['un', 'de'];
		const tokens = ['un', 'de', 'trois'];

		const filter = createFilterSW(sw);

		const results = filter(tokens);
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBe(1);
	});
});
